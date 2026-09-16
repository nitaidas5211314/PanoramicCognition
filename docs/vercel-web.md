# 报告站点：部署到 Vercel

`web/` 是一个 Next.js 站点，把 `reports/` 下的报告做成可浏览、可下载的网站。

| 路由 | 内容 |
|---|---|
| `/` | HTML 报告汇总（搜索 + 标签筛选） |
| `/html/<id>` | 单份 HTML 报告：iframe 原样展示（交互工具正常运行）；右上角「下载 HTML」「新窗口」，有同名 MD 时可一键切换 |
| `/md` | Markdown 文档汇总 |
| `/md/<id>` | 单份 MD 报告：渲染后阅读，左侧目录，【事实】等来源标签与 HTML 版同色；右上角「下载 Markdown」 |

`<id>` 是 slug 的 sha1 前 10 位，URL 全是 ASCII。下载时文件名还原为 `<slug>.html` / `<slug>.md`。

---

## 工作原理

```
reports/*.html|*.md ─┐
tools/state.json    ─┴─▶ web/scripts/sync-reports.mjs ─▶ web/public/files/<id>.{html,md}
                                                       └▶ web/data/manifest.json
                                                              │
                                        next build（全部页面静态预渲染） ◀┘
```

- `npm run dev` / `npm run build` 之前会自动执行同步（`predev` / `prebuild`），**不需要手动拷贝报告**。
- 标题、副标题、英文副题、生成日期、耗时取自 HTML；标签取自 MD 头部的「标签：」行；排序按 `state.json` 的完成时间，最新的排在前面。
- 同步产物（`public/files/`、`data/`）已在 `web/.gitignore` 里忽略，不入库。
- 引擎这边完全不用改：`reports/` 有新文件，重新构建站点即可。

环境变量（可选）：

| 变量 | 默认 | 作用 |
|---|---|---|
| `REPORTS_DIR` | `../reports` | 报告目录 |
| `STATE_FILE` | `../tools/state.json` | 队列状态，缺失时不影响构建，只是排序退化为按文件时间 |
| `REPORTS_EXCLUDE` | `selftest` | 不展示的 slug，逗号分隔 |

---

## 本地运行

需要 Node 20.9+。

```bash
cd web
npm install
npm run dev          # http://localhost:3000，改了 reports/ 后重启即可
```

生产模式预览：

```bash
cd web
npm run build
npm start
```

---

## 部署到 Vercel

### 方式 A：关联 Git 仓库（推荐，推送即部署）

1. 把整个仓库推到 GitHub / GitLab。**`reports/` 和 `tools/state.json` 必须入库**，站点构建时要读它们。
2. Vercel → Add New Project → 导入该仓库。
3. **Root Directory 选 `web`**。Framework 会自动识别为 Next.js，Build / Install 命令保持默认。
4. 确认 Settings → Build and Deployment → Root Directory 下的「Include files outside the root directory in the Build Step」处于开启状态（默认开启）。关掉的话构建时读不到 `../reports`，同步脚本会直接报错退出。
5. Deploy。

之后每次推送（例如流水线 `queue.py done` 后提交了新报告），Vercel 自动重新构建。`web/vercel.json` 里配置了 `ignoreCommand`：只有 `web/`、`reports/`、`tools/state.json` 有变化时才构建，只改内容源、队列等其他文件的提交会被跳过。

### 方式 B：Vercel CLI

```bash
npm i -g vercel
cd <仓库根>
vercel link          # 首次：创建/关联项目，Root Directory 填 web
vercel               # 预览部署
vercel --prod        # 生产部署
```

**必须在仓库根执行**，不要在 `web/` 里执行。CLI 只上传当前目录；在 `web/` 里部署时，`../reports` 不会被上传，构建会失败。

---

## 访问控制

报告部署后默认**任何拿到链接的人都能访问**。如果内容不宜公开：

- Vercel → Settings → Deployment Protection：开启 Vercel Authentication（仅团队成员可看），或使用 Password Protection（付费计划）。
- 或者只保留预览部署，不绑定公开域名。

---

## 常见问题

| 现象 | 原因 | 处理 |
|---|---|---|
| 构建报 `[sync] 找不到报告目录` | Root Directory 外的文件没带进构建；或者 CLI 是在 `web/` 里执行的 | 开启「Include files outside the root directory」；CLI 在仓库根执行 |
| 新报告没出现在站点上 | 报告没提交 / 没推送；或者 `ignoreCommand` 判定为无变化 | 确认 `reports/` 下的新文件已推送；需要强制构建时在 Vercel 面板上点 Redeploy |
| 某个主题只有 HTML 没有 MD | 早期归档件（如 `quant-math`）本来就没有 MD | 正常现象：它只出现在 HTML 列表里 |
| 列表里出现了进行中的主题 | 流水线在 `done` 之前就已经写出了 `reports/` 文件 | 站点只看文件是否存在，不看队列状态；如不想展示，就在 `done` 之后再提交 |
