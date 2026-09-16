import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container not-found">
      <h1>找不到这份报告</h1>
      <p>它可能已被移除，或者链接来自旧版本的站点。</p>
      <Link href="/" className="btn btn-primary">回到报告列表</Link>
    </main>
  );
}
