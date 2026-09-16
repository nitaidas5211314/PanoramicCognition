# 在 Linux 服务器上运行引擎并对接 Cursor CLI

本文分两部分：

1. **兼容性结论**：`tools/` 里的代码能不能直接在 Linux 上跑，哪些地方要改。
2. **对接 Cursor CLI**：在服务器上安装、登录、配置 `cursor-agent`，然后用它手动 / 批量 / 定时跑主题队列。

---

## 一、兼容性结论

**引擎本身（`build.py` + `queue.py`）可以直接在 Linux 上运行，不用改代码。** 在 Linux 上真正要处理的是**周边环境**：中文字体、时区、无头浏览器路径，还有 AI 驱动层要从 WorkBuddy 换成 Cursor CLI。

### 1.1 引擎代码：可直接运行

| 检查项 | 结论 | 说明 |
|---|---|---|
| Python 版本 | ✅ ≥ 3.7 | 用到了 `datetime.fromisoformat`（3.7+）；`str \| None` 这种写法有 `from __future__ import annotations` 兜底。按 3.6–3.10 语法解析都能通过，建议用 3.10+ |
| 第三方依赖 | ✅ 仅 `markdown` | `pip install markdown` |
| 路径定位 | ✅ 与工作目录无关 | 两个脚本都用 `pathlib.Path(__file__).resolve()` 定位，在项目根或 `tools/` 下运行都可以 |
| 文件编码 | ✅ | 所有读写都显式写了 `encoding="utf-8"`，不依赖系统 locale |
| 子进程 | ✅ | `queue.py done` 用 `sys.executable` 调 `build.py`，没有写死解释器路径 |
| 平台专属调用 | ✅ 没有 | 没有 `open`、AppleScript、`/Applications`、`darwin` 之类的判断 |
| 中文文件名 | ✅ | ext4 原生支持 UTF-8 文件名；`reports/` 里已有繁体长文件名，同样可用 |

### 1.2 需要注意 / 调整的地方

| 项 | 问题 | 处理 |
|---|---|---|
| **时区** | `queue.py` 用 `datetime.now()`（本地时间）记录 `started` / `finished`、计算耗时，并判断僵尸任务（120 分钟）。云服务器默认一般是 UTC，而 `state.json` 里已有的时间戳是北京时间，两边混用会让耗时和僵尸判断差 8 小时 | 服务器设为 `Asia/Shanghai`（`sudo timedatectl set-timezone Asia/Shanghai`），或者在所有调用前加 `TZ=Asia/Shanghai` |
| **Locale** | 只影响终端里中文的显示，不影响文件 | `export LANG=C.UTF-8`（cron / systemd 环境里也要设） |
| **无头截图** | README 和技能里写的是 `/Applications/Google Chrome.app/...`，这是 macOS 路径 | 改用 `chromium` / `google-chrome`（见 2.1 和 3.4） |
| **中文字体** | 服务器通常没装 CJK 字体，截图里的中文会显示成方框（豆腐块）。**生成的 HTML 本身没问题**，只影响服务器上的截图校验 | `apt install fonts-noto-cjk` |
| **JS 语法校验** | 校验流程依赖 `node --check` | 装 Node 18+ |
| **硬编码的 Mac 路径** | `.workbuddy/memory/` 和 `panorama-handbook/SKILL.md` 里写死了 `/Users/nitai/...` 和 WorkBuddy 自带的 python / node 路径 | 这些是给 AI 看的说明，不是代码。迁到 Cursor 时改成服务器路径（见 2.5） |
| **`present_files`** | WorkBuddy 专用的「打开预览」工具，Cursor CLI 里没有 | 交付步骤改成「输出产物路径」，需要预览时用 `scp` / 静态文件服务查看（见 3.5） |
| **归档件** | `reports/quant-math.html` 没有内容源，重建时不会重新生成 | 同步 `reports/` 时不要用 `rsync --delete` 覆盖掉它 |

---

## 二、配置步骤

以 Ubuntu 22.04 / 24.04 为例（Debian 系命令相同；RHEL 系把 `apt` 换成 `dnf`）。

### 2.1 系统依赖

```bash
sudo apt update
sudo apt install -y python3 python3-pip python3-venv git curl \
                    chromium fonts-noto-cjk
# Node 18+（校验 JS 语法用），任选一种安装方式，这里用 NodeSource
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

sudo timedatectl set-timezone Asia/Shanghai
```

> Ubuntu 上的 `chromium` 是 snap 包，二进制一般在 `/snap/bin/chromium`；如果 snap 用不了，可以装 Google Chrome 的 `.deb`，命令是 `google-chrome`。下文统一用 `$CHROME` 变量指代。

### 2.2 部署项目

二选一：

```bash
# 方式 A：先在本机提交并推到远端，再到服务器 clone
git clone <你的仓库地址> ~/PanoramicCognitionPracticeEngine

# 方式 B：直接从 Mac 同步（在 Mac 上执行；不要加 --delete）
rsync -av --exclude '.DS_Store' --exclude '__pycache__' \
  ~/Documents/WorkCode/Tools/PanoramicCognitionPracticeEngine/ \
  user@server:~/PanoramicCognitionPracticeEngine/
```

建立 Python 虚拟环境并做一次冒烟测试：

```bash
cd ~/PanoramicCognitionPracticeEngine
python3 -m venv .venv
.venv/bin/pip install markdown

.venv/bin/python tools/build.py --list      # 列出内容源（注意：--check 目前未实现，会真的全量构建）
.venv/bin/python tools/queue.py list        # 应能看到与 Mac 上一致的队列
.venv/bin/python tools/queue.py stats
```

记得把 `.venv/` 加进 `.gitignore`。

### 2.3 安装 Cursor CLI

```bash
curl https://cursor.com/install -fsS | bash
# 安装到 ~/.local/bin，命令为 cursor-agent（也可以用 agent）
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc && source ~/.bashrc
cursor-agent --version
```

### 2.4 认证（服务器没有浏览器）

两种方式任选：

**方式 A：API Key（推荐，适合 cron / systemd）**

在 Cursor 控制台（Dashboard → Integrations / API Keys）生成一个 key，写进只有自己能读的环境文件：

```bash
mkdir -p ~/.config/panorama
cat > ~/.config/panorama/env <<'EOF'
CURSOR_API_KEY=key_xxxxxxxxxxxxxxxx
TZ=Asia/Shanghai
LANG=C.UTF-8
EOF
chmod 600 ~/.config/panorama/env
```

**方式 B：交互登录（适合自己 SSH 上去手动用）**

```bash
NO_OPEN_BROWSER=1 cursor-agent login
# 终端会打印一个 URL，在本地浏览器里打开并完成授权
```

验证：

```bash
set -a; . ~/.config/panorama/env; set +a
cursor-agent --list-models
```

### 2.5 让 Cursor 看懂项目规则

WorkBuddy 下的知识分散在三处：`README.md`、`.workbuddy/memory/`、`~/.workbuddy/skills/panorama-handbook/SKILL.md`。Cursor 不会自动读取 `.workbuddy/`，需要把这些内容接进 Cursor 能识别的位置。

**① 技能：复制到 `.cursor/skills/`**

```bash
mkdir -p .cursor/skills
# 在 Mac 上执行，把技能拷到项目里（随仓库一起同步到服务器）
cp -R ~/.workbuddy/skills/panorama-handbook .cursor/skills/
```

复制后需要修改 `.cursor/skills/panorama-handbook/SKILL.md` 里和 Mac / WorkBuddy 相关的几处：

| 原内容 | 改为 |
|---|---|
| `/Users/nitai/Documents/WorkCode/Tools/PanoramicCognitionPracticeEngine` | 相对路径「仓库根」，或服务器上的绝对路径 |
| `CHROME="/Applications/Google Chrome.app/..."` | `CHROME="$(command -v chromium \|\| command -v google-chrome)"` |
| `present_files ...` | 「在最终回复里列出 `reports/<slug>.html` 与 `reports/<slug>.md` 的路径」 |
| `WebSearch` | Cursor Agent 自带网络搜索工具，写成「联网检索」即可 |
| 工作日志写到 `.workbuddy/memory/YYYY-MM-DD.md` | 可以保留原路径，也可以改成 `logs/`，前后一致就行 |

> 如果你用的 Cursor 版本还不支持 Agent Skills，把 SKILL.md 的正文放进 `.cursor/rules/panorama-handbook.mdc`（front matter 写 `alwaysApply: true`）也能达到同样效果。

**② 项目记忆：写进 `AGENTS.md`**

在仓库根新建 `AGENTS.md`，Cursor Agent 每次都会读取。内容可以直接从 `.workbuddy/memory/MEMORY.md` 的「硬约定」「工具行为坑」和 `automations/.../memory.md` 的「关键教训」整理过来，并把解释器路径改成：

```markdown
- Python：`.venv/bin/python`（不要用 WorkBuddy 的 python 路径）
- Node：系统 `node`
- 无头浏览器：`chromium`（或 `google-chrome`），截图必须带 `--no-sandbox`
- 服务器没有 present_files；交付 = 在最终回复里给出 reports/ 下两个文件的路径
```

**③ 权限：`.cursor/cli.json`**

无人值守运行时，Agent 需要执行 shell、写文件。建议用白名单明确允许，而不是一律 `--force`：

```json
{
  "permissions": {
    "allow": [
      "Shell(.venv/bin/python)",
      "Shell(python3)",
      "Shell(node)",
      "Shell(chromium)",
      "Shell(google-chrome)",
      "Shell(ls)",
      "Shell(grep)",
      "Shell(cat)",
      "Shell(mkdir)",
      "Read(**)",
      "Write(tools/content/**)",
      "Write(tools/state.json)",
      "Write(tools/queue.md)",
      "Write(tools/assets/shell.html)",
      "Write(reports/**)",
      "Write(logs/**)",
      "Write(.workbuddy/memory/**)"
    ],
    "deny": [
      "Shell(rm)",
      "Shell(git push)",
      "Write(tools/build.py)",
      "Write(tools/queue.py)"
    ]
  }
}
```

> 白名单里没覆盖到的操作，在 `-p` 非交互模式下会被拒绝，这一步随之失败。先手动跑一两次，看日志里哪些调用被拒，再按需补进去。如果服务器是专用的一次性机器，也可以直接用 `--force` 放开全部权限。

### 2.6 配置完成后的目录

```
PanoramicCognitionPracticeEngine/
├── AGENTS.md                         ← 新增：项目约定（从 .workbuddy/memory 整理）
├── .cursor/
│   ├── cli.json                      ← 新增：CLI 权限白名单
│   └── skills/panorama-handbook/     ← 新增：写作技能（已改掉 Mac 路径）
├── .venv/                            ← 新增：Python 虚拟环境（不入库）
├── logs/                             ← 新增：运行日志（不入库）
├── docs/linux-cursor-cli.md          ← 本文
├── tools/  reports/  README.md       ← 原样
```

---

## 三、使用流程

以下命令都在**仓库根**执行，并已加载环境变量：

```bash
cd ~/PanoramicCognitionPracticeEngine
set -a; . ~/.config/panorama/env; set +a
```

### 3.1 交互式：像在 IDE 里一样对话

```bash
cursor-agent
# 进入 TUI 后输入：跑下一个主题
```

SSH 容易断线，长任务建议用 `persist` 启动，断线后还能重新连上：

```bash
cursor-agent persist "跑下一个主题"
cursor-agent persist list
cursor-agent persist attach <session>
```

### 3.2 非交互：跑一个主题

```bash
mkdir -p logs
cursor-agent -p --trust \
  --output-format stream-json \
  "按 panorama-handbook 技能和 AGENTS.md 的约定，跑下一个主题：
   queue.py list 检查是否有进行中 → next → 联网检索 4–8 条 → 写 tools/content/<slug>.md 与 .js
   → build.py <slug> → 结构/JS/数值/截图校验 → queue.py done <slug>。
   失败则 queue.py fail <slug> \"原因\"。最后输出两个产物路径。" \
  | tee "logs/$(date +%F_%H%M).jsonl"
```

| 参数 | 作用 |
|---|---|
| `-p` / `--print` | 非交互，跑完就退出，适合脚本调用 |
| `--trust` | 跳过「是否信任此工作区」的提示，无人值守时必须加 |
| `--output-format stream-json` | 逐条输出工具调用，方便事后查日志；只想看最终结果就用 `text` |
| `--model <名称>` | 指定模型，可用 `--list-models` 查看 |
| `--force` | 放开全部命令权限（不想维护 `cli.json` 白名单时使用） |

### 3.3 批量跑

```bash
.venv/bin/python tools/queue.py batch --dry-run      # 先看本批会跑哪些
cursor-agent -p --trust --output-format stream-json \
  "批量跑：python tools/queue.py batch --limit 3 取清单，循环内一律用 next --skip-failed，
   每个主题做完立即 done，失败立即 fail 并接下一个，最后 batch --summary 汇报。" \
  | tee "logs/batch_$(date +%F_%H%M).jsonl"
```

单次会话的上下文有限，`--limit` 建议设成 1–3；剩下的下次再跑，`batch` 会接着没跑完的继续。

### 3.4 校验命令（Linux 版）

用下面这段替换 README「校验清单」里的第 4 步：

```bash
CHROME="$(command -v chromium || command -v chromium-browser || command -v google-chrome)"
URI=$(.venv/bin/python -c "import pathlib;print(pathlib.Path('reports/<slug>.html').resolve().as_uri())")
"$CHROME" --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --virtual-time-budget=5000 --window-size=1340,2000 \
  --screenshot=/tmp/shot.png "$URI"
```

- `--no-sandbox`：以 root 或在容器里运行 Chromium 时必须加。
- snap 版 Chromium 只能访问 `$HOME` 下的文件，截图输出路径 `/tmp` 可能写不进去，那就改成 `~/shot.png`。
- 截图里中文显示成方框 → 没装 `fonts-noto-cjk`。

第 1–3 步（标签配对、`node --check`、数值验算）在 Linux 上不用改。

### 3.5 查看产物

服务器上没有 `present_files`，可以用下面几种方式看：

```bash
# 拉回本地（在 Mac 上执行）
scp "user@server:~/PanoramicCognitionPracticeEngine/reports/<slug>.*" ~/Downloads/

# 或者在服务器上临时起一个静态服务，通过 SSH 端口转发访问
.venv/bin/python -m http.server 8000 --bind 127.0.0.1 --directory reports
# Mac 上：ssh -L 8000:127.0.0.1:8000 user@server，然后浏览器打开 http://localhost:8000
```

### 3.6 定时自动推进（替代 WorkBuddy 自动化）

WorkBuddy 自动化 `a94594e5` 的做法是每小时推进一个主题，遇到 120 分钟内的「进行中」就跳过。服务器上用一个包装脚本加 cron 实现：`flock` 负责进程级互斥，`queue.py` 自己的僵尸检测负责兜底。

`scripts/run-next.sh`：

```bash
#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
set -a; . "$HOME/.config/panorama/env"; set +a
export PATH="$HOME/.local/bin:$PATH"
mkdir -p logs

# 上一轮还没结束就直接退出（进程级互斥，比只看 state.json 更可靠）
exec 9>logs/.run.lock
flock -n 9 || { echo "$(date '+%F %T') 上一轮仍在运行，跳过"; exit 0; }

# 没有待处理主题就不启动 Agent，不消耗额度
if ! .venv/bin/python tools/queue.py batch --dry-run --json | grep -q '"slug"'; then
  echo "$(date '+%F %T') 队列已清空"; exit 0
fi

cursor-agent -p --trust --output-format stream-json \
  "按 panorama-handbook 技能与 AGENTS.md 推进队列中的下一个主题（next --skip-failed），
   完成后 done，失败则 fail 并说明原因；若发现 120 分钟内的进行中主题则直接退出。" \
  > "logs/$(date +%F_%H%M).jsonl" 2>&1
```

```bash
chmod +x scripts/run-next.sh
./scripts/run-next.sh          # 先手动跑一次确认没问题
crontab -e
```

```cron
# 每小时第 5 分钟触发；间隔按 `queue.py stats` 的 RECOMMEND_HOURS 调整
5 * * * * /home/<user>/PanoramicCognitionPracticeEngine/scripts/run-next.sh >> /home/<user>/PanoramicCognitionPracticeEngine/logs/cron.log 2>&1
```

> `batch --dry-run --json` 会把待处理主题列在 `topics[]` 里，每项都带 `"slug"`；队列空了就匹配不到，脚本直接退出。

**间隔怎么定**：继续沿用 README 的规则，`max(1, ceil(最长单主题耗时 × 1.5 ÷ 60))` 小时。服务器上跑几轮以后执行 `queue.py stats`，按 `RECOMMEND_HOURS` 更新 crontab。

**不要让 Mac 上的 WorkBuddy 自动化和服务器上的 cron 同时对同一份 `state.json` 推进。** 两边只能保留一个；如果两边都在用，要靠 git 同步 `tools/state.json`，冲突时以跑得更晚的一边为准。

---

## 四、常见问题

| 现象 | 原因 | 处理 |
|---|---|---|
| `缺少依赖：pip install markdown` | 用的是系统 python，而不是 `.venv` | 用 `.venv/bin/python` 调用；AGENTS.md 里也写明这一点 |
| 耗时显示 8 小时，或刚开始的主题被判成僵尸 | 服务器是 UTC，`state.json` 里是北京时间 | 设置 `TZ=Asia/Shanghai`（cron 里也要生效，所以放进 env 文件） |
| 截图全是方框 | 缺少 CJK 字体 | `apt install fonts-noto-cjk` |
| Chromium 报 `No usable sandbox` | 以 root 或在容器里运行 | 加 `--no-sandbox` |
| `cursor-agent -p` 卡住不动 | 在等待工作区信任 / 权限确认 | 加 `--trust`；在 `cli.json` 里补上白名单，或加 `--force` |
| cron 里报 `cursor-agent: command not found` | cron 的 PATH 很短 | 包装脚本里已经 `export PATH=$HOME/.local/bin:$PATH` |
| Agent 在找 `/Users/nitai/...` 或 `present_files` | 技能 / 记忆里还有 Mac 路径 | 按 2.5 的对照表改掉 `.cursor/skills/` 和 `AGENTS.md` |
| 队列卡在某个失败主题 | 用了普通 `next` | 批量和定时场景一律用 `next --skip-failed` |
