# 雾岭之后

一个部署到 GitHub Pages 的荒野求生文字冒险游戏。玩家通过探索、采集、合成和关键选择推进游戏内时间，最终在多个结局中抵达自己的路线。

## 开发与发布

- 项目使用 Vite。
- 本地开发命令：`npm install` 后执行 `npm run dev`。
- 构建命令：`npm run build`。
- 推送到 `main` 后，GitHub Actions 会构建项目并发布 `dist` 到 `gh-pages` 分支。
- GitHub Pages 需要配置为从 `gh-pages` 分支根目录发布。

## 调试入口

- 在网页内连续输入 `seltdebug` 可打开隐藏调试面板。
- 代码内的 `CHEAT_ALWAYS_ON` 可快速改为 `true`，用于测试时默认显示调试面板。

## 存档

游戏进度保存在浏览器 `localStorage` 中，并支持导入、导出 Base64 存档码。
