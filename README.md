# MarkPanel

一个基于 Vue 3 + Milkdown 构建的 Chrome 侧边栏 Markdown 笔记插件。

> 在浏览器侧边栏中随时记录、整理 Markdown 笔记，数据持久化存储于 `localStorage`，刷新插件后数据不丢失。

---

## ✨ 功能特性

### 笔记管理
- **新建 / 删除笔记**：首页一键新建，卡片内二次确认删除，防止误操作
- **重命名笔记**：笔记卡片 hover 后点击铅笔图标即可内联编辑标题
- **笔记预览**：首页卡片展示纯文本摘要（自动剥离 `#`、`**`、`-` 等 Markdown 语法符号）
- **时间戳**：自动显示相对时间（JUST NOW / 3M AGO / 2H AGO / YESTERDAY 等）

### 文件夹
- **新建文件夹**：点击文件夹选择器中的「New Folder」即可创建
- **重命名文件夹**：点击铅笔图标内联编辑，回车或失焦保存，Esc 取消
- **删除文件夹**：点击垃圾桶图标，需二次确认（3 秒超时自动取消），`default` 文件夹不可删除
- **笔记归属**：删除文件夹后其中的笔记自动归回默认工作区

### Markdown 编辑器
- 基于 [Milkdown Crepe](https://github.com/Milkdown/milkdown) 的所见即所得富文本编辑器
- 支持斜杠菜单（输入 `/` 唤起）、代码块、引用、列表、标题等常用语法
- **自动保存**：编辑内容 1 秒后自动保存至 `localStorage`

---

## 🛠 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| [Vue 3](https://vuejs.org/) | ^3.5 | 前端框架 |
| [Vite](https://vite.dev/) | ^7.3 | 构建工具 |
| [Milkdown Crepe](https://github.com/Milkdown/milkdown) | ^7.19 | Markdown 编辑器 |
| [Pinia](https://pinia.vuejs.org/) | ^3.0 | 状态管理 |
| [Vue Router](https://router.vuejs.org/) | ^5.0 | 路由 |
| [Naive UI](https://www.naiveui.com/) | ^2.44 | UI 组件库（图标等） |
| [@crxjs/vite-plugin](https://crxjs.dev/vite-plugin) | ^2.4 | Chrome 插件构建 |
| TypeScript | ~5.9 | 类型支持 |

---

## 📁 项目结构

```
src/
├── background/          # Chrome Service Worker
├── components/
│   ├── editorPage/      # 编辑器页面组件（NoteHeader、MilkdownEditor）
│   └── homePage/        # 首页组件（NoteCard、FolderPicker、SearchBar 等）
├── router/              # 路由配置
├── store/               # Pinia 状态（note.ts、theme.ts）
├── styles/              # 全局样式 & Milkdown 自定义样式
└── view/                # 页面视图（HomeView、EditorView）
```

---

## 🚀 快速开始

### 安装依赖

```sh
npm install
```

### 开发模式（热更新）

```sh
npm run dev
```

### 构建生产包

```sh
npm run build
```

构建产物位于 `dist/` 目录。

### 加载到 Chrome

1. 打开 `chrome://extensions/`
2. 开启右上角「开发者模式」
3. 点击「加载已解压的扩展程序」，选择 `dist/` 目录
4. 点击浏览器工具栏中的侧边栏按钮即可打开 MarkPanel

---

## 📌 已知问题 / 待办

- [ ] 深色模式下代码块存在白色边框问题（Milkdown 底层样式覆盖问题）
- [ ] 深色模式下部分提示文字颜色偏暗
- [ ] 导出笔记为 `.md` 文件
- [ ] GitHub 链接导向

---

## 📄 License

[MIT](./LICENSE)
