# EasyNote Home Page UI

这是为Chrome插件侧边栏设计的笔记应用Home页面UI。

## 功能特性

### 🎨 主题系统
- **深色主题**：专为长时间使用优化，减少眼睛疲劳
- **亮色主题**：清爽明亮的界面风格
- **实时切换**：点击header中的主题按钮即可切换，无需刷新

### 📝 笔记管理
- **笔记列表**：展示所有笔记，支持分类标签
- **搜索功能**：实时搜索笔记标题和内容
- **收藏功能**：点击星标快速收藏/取消收藏笔记
- **分类标签**：Work、Personal、Dev等多种分类

### 🗂️ 分类浏览
- **All Notes**：显示所有笔记
- **Favorites**：只显示已收藏的笔记
- **Pinned**：显示置顶笔记

### 📱 响应式设计
- **侧边栏适配**：完全适配Chrome插件侧边栏宽度变化
- **弹性布局**：左右边距自适应，内容不会被挤压
- **滚动优化**：自定义滚动条样式，与主题配色一致

## 组件结构

```
src/
├── components/homePage/
│   ├── HomeHeader.vue       # 顶部header，包含标题和主题切换
│   ├── CategoryTabs.vue     # 分类标签页
│   ├── NoteList.vue         # 笔记列表容器
│   └── NoteCard.vue         # 单个笔记卡片
├── view/
│   └── HomeView.vue         # 主页面容器
├── models/
│   └── note.ts              # 数据模型定义
├── styles/
│   └── global.css           # 全局样式
└── main.ts                  # 应用入口
```

## 主题变量

### 深色主题 (theme-dark)
```css
--bg-primary: #0f172a        /* 主背景 */
--bg-secondary: #1e293b      /* 次背景 */
--card-bg: #1e293b           /* 卡片背景 */
--text-primary: #f1f5f9      /* 主文本 */
--text-secondary: #94a3b8    /* 次文本 */
--accent-color: #0ea5e9      /* 强调色 */
```

### 亮色主题 (theme-light)
```css
--bg-primary: #f8fafc        /* 主背景 */
--bg-secondary: #f1f5f9      /* 次背景 */
--card-bg: #ffffff           /* 卡片背景 */
--text-primary: #0f172a      /* 主文本 */
--text-secondary: #475569    /* 次文本 */
--accent-color: #0284c7      /* 强调色 */
```

## 使用方式

### 创建新笔记
点击"+ New Note"按钮创建新笔记，会导航到编辑器视图。

### 搜索笔记
在搜索框输入关键词，实时过滤笔记列表。

### 收藏笔记
点击笔记卡片右下角的星标图标收藏/取消收藏。

### 切换主题
点击header右上角的太阳/月亮图标切换深色/亮色主题。

## 数据模型

```typescript
interface Note {
  id: string              // 笔记唯一标识
  title: string           // 笔记标题
  content: string         // 笔记内容
  category: string        // 分类（Work/Personal/Dev等）
  timestamp: number       // 创建/修改时间戳
  isFavorite: boolean     // 是否收藏
  tags?: string[]         // 标签数组
}

type TabType = 'all' | 'favorites' | 'pinned'  // 分类标签类型
```

## 样式特点

- **卡片设计**：每个笔记都是独立的卡片，hover时有视觉反馈
- **时间显示**：智能显示相对时间（JUST NOW、2H AGO、YESTERDAY等）
- **内容截断**：长内容自动截断显示，保持列表整洁
- **分类颜色**：不同分类使用不同颜色标签，便于快速识别
- **平滑过渡**：所有交互都有smooth transition，提升用户体验

## 侧边栏适配

该UI完全为Chrome插件侧边栏设计：

- ✅ 固定高度的header，不会因内容变化而塌陷
- ✅ 弹性的左右padding，适应不同宽度
- ✅ 完整的flex布局，确保footer始终在底部
- ✅ 自定义滚动条，与主题配色一致
- ✅ 所有文本都有overflow处理，不会超出边界

## 后续集成

当前使用mock数据，实际使用时需要：

1. 连接到Chrome Storage API获取真实笔记数据
2. 实现笔记的增删改查功能
3. 集成编辑器视图的导航
4. 添加笔记同步功能
