# EditorView 美化和主题集成指南

## 概述
EditorView已经完全美化并与HomeView保持风格一致，支持深色/亮色主题实时切换，包括Milkdown编辑器内容。

## 主要改进

### 1. EditorView.vue
- ✅ 添加主题支持（深色/亮色）
- ✅ CSS变量系统与HomeView一致
- ✅ 响应式布局
- ✅ 自定义滚动条样式

### 2. NoteHeader.vue
- ✅ 重新设计，与HomeHeader风格一致
- ✅ 返回按钮（返回首页）
- ✅ 主题切换按钮
- ✅ 设置按钮（预留）
- ✅ 可编辑的笔记标题
- ✅ 响应式设计

### 3. MilkdownEditor.vue
- ✅ 主题感知（监听themeMode变化）
- ✅ 深色/亮色主题样式
- ✅ 自动应用主题到编辑器
- ✅ 支持代码块、引用块等元素的主题适配

### 4. crep-custom.css
- ✅ 完整的深色主题样式
- ✅ 完整的亮色主题样式
- ✅ Milkdown编辑器内容样式
- ✅ CodeMirror代码块样式
- ✅ 列表、表格、分割线等元素样式

## 主题变量

### 深色主题 (theme-dark)
```css
--bg-primary: #0f172a        /* 主背景 */
--bg-secondary: #1e293b      /* 次背景 */
--header-bg: #1e293b         /* 头部背景 */
--text-primary: #f1f5f9      /* 主文本 */
--text-secondary: #cbd5e1    /* 次文本 */
--text-tertiary: #94a3b8     /* 三级文本 */
--accent-color: #0ea5e9      /* 强调色 */
--border-color: #334155      /* 边框色 */
--button-hover-bg: #334155   /* 按钮悬停 */
--button-active-bg: #475569  /* 按钮激活 */
```

### 亮色主题 (theme-light)
```css
--bg-primary: #f8fafc        /* 主背景 */
--bg-secondary: #f1f5f9      /* 次背景 */
--header-bg: #ffffff         /* 头部背景 */
--text-primary: #0f172a      /* 主文本 */
--text-secondary: #475569    /* 次文本 */
--text-tertiary: #94a3b8     /* 三级文本 */
--accent-color: #0284c7      /* 强调色 */
--border-color: #e2e8f0      /* 边框色 */
--button-hover-bg: #f1f5f9   /* 按钮悬停 */
--button-active-bg: #e2e8f0  /* 按钮激活 */
```

## 功能说明

### 主题切换
- 点击NoteHeader右上角的太阳/月亮图标切换主题
- 主题变化会实时应用到：
  - 编辑器背景和文本
  - Milkdown工具栏
  - 代码块
  - 引用块
  - 所有文本元素

### 返回首页
- 点击NoteHeader左侧的返回箭头按钮
- 返回到HomeView（笔记列表页面）

### 编辑器样式
- 代码块：带背景色和边框
- 引用块：左边框 + 背景色
- 链接：带下划线和强调色
- 标题：使用主文本颜色
- 列表和表格：完整样式支持

## 文件修改清单

| 文件 | 修改内容 |
|------|---------|
| `src/view/EditorView.vue` | 添加主题支持、CSS变量、布局优化 |
| `src/components/editorPage/NoteHeader.vue` | 完全重新设计，添加主题切换和返回按钮 |
| `src/components/editorPage/MilkdownEditor.vue` | 添加主题感知、动态样式应用 |
| `assets/crep-custom.css` | 添加深色/亮色主题完整样式 |

## 使用方式

### 在EditorView中使用
```vue
<template>
  <div class="editor-view" :class="`theme-${themeMode}`">
    <NoteHeader :theme-mode="themeMode" @update:theme-mode="themeMode = $event" />
    <MilkdownEditor :theme-mode="themeMode" />
  </div>
</template>

<script setup>
const themeMode = ref('dark')
</script>
```

### 主题切换流程
1. 用户点击NoteHeader中的主题按钮
2. 触发 `@update:theme-mode` 事件
3. EditorView更新 `themeMode` 状态
4. MilkdownEditor监听到变化并应用新主题
5. CSS类名变化触发样式更新

## 后续优化建议

1. **主题持久化**：将主题选择保存到localStorage
2. **系统主题检测**：根据系统偏好自动选择主题
3. **主题同步**：在HomeView和EditorView之间同步主题状态
4. **自定义主题**：允许用户自定义颜色方案
5. **过渡动画**：添加主题切换的平滑过渡效果

## 已知限制

- Milkdown的某些内置样式可能需要 `!important` 来覆盖
- CodeMirror代码块的语法高亮可能需要额外配置
- 某些第三方插件的样式可能不会自动适配主题

## 测试清单

- [ ] 深色主题下所有文本可读
- [ ] 亮色主题下所有文本可读
- [ ] 主题切换时编辑器内容不丢失
- [ ] 返回按钮正确导航到首页
- [ ] 代码块在两种主题下都显示正确
- [ ] 引用块在两种主题下都显示正确
- [ ] 链接颜色在两种主题下都清晰可见
