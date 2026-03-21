<template>
  <nav class="note-header">
    <div class="header-left">
      <button class="icon-btn back-btn" aria-label="返回">
        <span class="icon">←</span>
      </button>
      <h1 class="note-title" contenteditable="true" spellcheck="false">
        New Note
      </h1>
    </div>

    <div class="header-right">
      <button class="icon-btn" aria-label="设置">
        <span class="icon">⚙️</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
// 可选：未来加点击编辑标题逻辑等
</script>

<style scoped>
.note-header {
  position: sticky;           /* 可选：如果页面长，固定在顶部 */
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;               /* 稍高一点，更现代舒适 */
  padding: 0 20px;            /* 左右间距更大，呼吸感强 */
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb; /* 极浅灰分隔线，更柔和 */
  color: #111827;             /* 深灰文字，阅读友好 */
  font-family: system-ui, -apple-system, sans-serif;
  user-select: none;
  backdrop-filter: blur(8px); /* 可选：轻微毛玻璃效果，高级感（现代趋势） */
  transition: background 0.3s ease;
}

.note-header:hover,
.note-header:focus-within {
  background: #fafafa;        /* hover 时微变色，增加交互感 */
}

/* 左侧 */
.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-btn {
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: #f3f4f6;
  transform: translateX(-2px); /* 轻微左移反馈 */
}

.note-title {
  font-size: 1.25rem;         /* 更大标题，更醒目 */
  font-weight: 600;
  margin: 0;
  color: #111827;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
  transition: color 0.2s;
}

.note-title:focus {
  color: #3b82f6;             /* 焦点时变蓝，突出可编辑 */
}

/* 右侧 */
.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-btn {
  background: none;
  border: none;
  color: #6b7280;             /* 灰色图标，更低调 */
  font-size: 1.25rem;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.icon-btn:hover,
.icon-btn:focus {
  background: #f3f4f6;
  color: #374151;
  transform: scale(1.08);     /* 轻微放大反馈 */
}

.user-avatar:hover {
  transform: scale(1.08);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); /* hover 发光 */
}

/* 响应式：小屏适配 */
@media (max-width: 640px) {
  .note-header {
    padding: 0 12px;
    height: 56px;
  }
  .note-title {
    font-size: 1.125rem;
  }
}
</style>