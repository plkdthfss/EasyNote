# EasyNote 项目架构总结

## 项目结构

```
src/
├── view/
│   ├── HomeView.vue          # 笔记列表页面（主页）
│   └── EditorView.vue        # 笔记编辑页面
├── components/
│   ├── homePage/
│   │   ├── HomeHeader.vue    # 首页头部（标题+主题切换）
│   │   ├── SearchBar.vue     # 搜索栏组件
│   │   ├── AddButton.vue     # 新建笔记按钮（带router导航）
│   │   ├── CategoryTabs.vue  # 分类标签页（All/Favorites/Pinned）
│   │   ├── NoteList.vue      # 笔记列表容器
│   │   └── NoteCard.vue      # 单个笔记卡片
│   └── editorPage/
│       ├── NoteHeader.vue    # 编辑页头部（返回+主题切换）
│       └── MilkdownEditor.vue # Milkdown编辑器包装
├── models/
│   └── note.ts               # 数据模型定义
├── router/
│   └── index.ts              # 路由配置
├── styles/
│   └── global.css            # 全局样式
├── App.vue                   # 应用根组件
└── main.ts                   # 应用入口

assets/
└── crep-custom.css           # Milkdown编辑器主题样式
```

## 核心功能

### 1. 主题系统
- **深色主题**：#0f172a 背景，#f1f5f9 文本
- **亮色主题**：#f8fafc 背景，#0f172a 文本
- **实时切换**：所有页面和编辑器同步更新
- **CSS变量**：统一管理所有颜色

### 2. 页面导航
- **HomeView** → 笔记列表
  - 搜索笔记
  - 分类浏览（All/Favorites/Pinned）
  - 收藏/取消收藏
  - 点击"New Note"进入编辑页

- **EditorView** → 笔记编辑
  - Milkdown Markdown编辑器
  - 可编辑的笔记标题
  - 返回首页按钮
  - 主题切换

### 3. 组件解耦
- **SearchBar**：独立的搜索组件，支持v-model
- **AddButton**：独立的按钮组件，内置router导航
- **NoteCard**：可复用的笔记卡片组件
- **CategoryTabs**：可复用的标签页组件

### 4. 数据模型
```typescript
interface Note {
  id: string              // 唯一标识
  title: string           // 笔记标题
  content: string         // 笔记内容
  category: string        // 分类（Work/Personal/Dev等）
  timestamp: number       // 创建/修改时间
  isFavorite: boolean     // 是否收藏
  tags?: string[]         // 标签数组
}

type TabType = 'all' | 'favorites' | 'pinned'
```

## 主题变量参考

### 深色主题
```css
--bg-primary: #0f172a        /* 主背景 */
--bg-secondary: #1e293b      /* 次背景 */
--header-bg: #1e293b         /* 头部背景 */
--card-bg: #1e293b           /* 卡片背景 */
--text-primary: #f1f5f9      /* 主文本 */
--text-secondary: #cbd5e1    /* 次文本 */
--text-tertiary: #94a3b8     /* 三级文本 */
--accent-color: #0ea5e9      /* 强调色（蓝色） */
--border-color: #334155      /* 边框色 */
```

### 亮色主题
```css
--bg-primary: #f8fafc        /* 主背景 */
--bg-secondary: #f1f5f9      /* 次背景 */
--header-bg: #ffffff         /* 头部背景 */
--card-bg: #ffffff           /* 卡片背景 */
--text-primary: #0f172a      /* 主文本 */
--text-secondary: #475569    /* 次文本 */
--text-tertiary: #94a3b8     /* 三级文本 */
--accent-color: #0284c7      /* 强调色（蓝色） */
--border-color: #e2e8f0      /* 边框色 */
```

## 关键特性

### ✅ 已实现
- [x] 响应式侧边栏布局（Chrome插件适配）
- [x] 深色/亮色主题切换
- [x] 笔记搜索功能
- [x] 笔记分类浏览
- [x] 笔记收藏功能
- [x] Markdown编辑器集成
- [x] 主题在编辑器中同步
- [x] 返回首页导航
- [x] 组件解耦设计

### 🔄 待实现
- [ ] 笔记数据持久化（Chrome Storage API）
- [ ] 笔记增删改查完整功能
- [ ] 笔记同步功能
- [ ] 主题偏好保存
- [ ] 离线支持
- [ ] 笔记导出功能

## 使用指南

### 添加新笔记
1. 点击HomeView中的"+ New Note"按钮
2. 自动导航到EditorView
3. 编辑笔记内容
4. 点击返回按钮回到首页

### 搜索笔记
1. 在SearchBar中输入关键词
2. 笔记列表实时过滤
3. 支持标题和内容搜索

### 切换主题
1. 点击任何页面右上角的太阳/月亮图标
2. 主题立即切换
3. 所有页面和编辑器同步更新

### 收藏笔记
1. 在NoteCard右下角点击星标图标
2. 笔记被添加到收藏
3. 在CategoryTabs中选择"Favorites"查看

## 开发建议

### 添加新主题
1. 在HomeView.vue和EditorView.vue中添加新的主题类
2. 定义新的CSS变量
3. 在crep-custom.css中添加编辑器样式

### 添加新组件
1. 在`src/components/homePage/`或`src/components/editorPage/`中创建
2. 使用CSS变量保持主题一致性
3. 支持v-model或emit事件进行通信

### 集成数据存储
1. 替换HomeView.vue中的mock数据
2. 使用Chrome Storage API或其他存储方案
3. 实现笔记的CRUD操作

## 性能优化

- ✅ 组件懒加载（通过router）
- ✅ CSS变量减少重复代码
- ✅ 自定义滚动条样式
- ✅ 平滑的主题过渡

## 浏览器兼容性

- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+

## 依赖项

- Vue 3.5+
- Vue Router 5+
- Milkdown 7.19+
- @vicons/ionicons5
- Naive UI 2.44+
