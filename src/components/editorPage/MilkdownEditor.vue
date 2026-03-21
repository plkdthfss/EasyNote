<template>
  <div class="editor-container" :class="`theme-${themeMode}`">
    <div ref="editorRef" class="crepe-editor"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, watch } from 'vue'
import { Crepe } from '@milkdown/crepe'
import '@milkdown/crepe/theme/common/style.css'
import '@milkdown/crepe/theme/frame.css'
import '../../../assets/crep-custom.css'

interface Props {
  themeMode: 'light' | 'dark'
}

const props = defineProps<Props>()
const editorRef = ref<HTMLDivElement | null>(null)
let crepe: Crepe | null = null

onMounted(() => {
  if (editorRef.value) {
    crepe = new Crepe({
      root: editorRef.value,
      features: {
        [Crepe.Feature.Toolbar]: true,
      },
      featureConfigs: {
        [Crepe.Feature.BlockEdit]: {
          handleAddIcon: '',
        },
      },
      defaultValue: '# Hello Milkdown!\n这是一段测试内容。尝试输入 `/` 来唤起斜杠菜单。',
    })

    crepe.create().then(() => {
      console.log('Milkdown Editor 准备就绪')
      applyTheme()
    })
  }
})

const applyTheme = () => {
  if (!editorRef.value) return

  const isDark = props.themeMode === 'dark'
  const root = editorRef.value

  if (isDark) {
    root.classList.add('dark-theme')
    root.classList.remove('light-theme')
  } else {
    root.classList.add('light-theme')
    root.classList.remove('dark-theme')
  }
}

watch(() => props.themeMode, () => {
  applyTheme()
})

onBeforeUnmount(() => {
  crepe?.destroy()
})
</script>

<style scoped>
.editor-container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.crepe-editor {
  width: 100%;
  height: 100%;
  min-height: auto;
  overflow-y: auto;
}

.crepe-editor .milkdown {
  max-width: 100%;
  padding: 16px;
}

/* 深色主题样式 */
.editor-container.theme-dark :deep(.crepe-editor),
.editor-container.theme-dark :deep(.milkdown) {
  background-color: #0f172a;
  color: #f1f5f9;
}

.editor-container.theme-dark :deep(.milkdown-menu),
.editor-container.theme-dark :deep(.milkdown-toolbar) {
  background-color: #1e293b;
  border-color: #334155;
  color: #f1f5f9;
}

.editor-container.theme-dark :deep(.milkdown-menu-item),
.editor-container.theme-dark :deep(.milkdown-toolbar-item) {
  color: #cbd5e1;
}

.editor-container.theme-dark :deep(.milkdown-menu-item:hover),
.editor-container.theme-dark :deep(.milkdown-toolbar-item:hover) {
  background-color: #334155;
  color: #f1f5f9;
}

.editor-container.theme-dark :deep(.milkdown-input),
.editor-container.theme-dark :deep(.milkdown-code) {
  background-color: #1e293b;
  color: #f1f5f9;
  border-color: #334155;
}

.editor-container.theme-dark :deep(.milkdown-blockquote) {
  border-left-color: #0ea5e9;
  color: #cbd5e1;
}

/* 亮色主题样式 */
.editor-container.theme-light :deep(.crepe-editor),
.editor-container.theme-light :deep(.milkdown) {
  background-color: #f8fafc;
  color: #0f172a;
}

.editor-container.theme-light :deep(.milkdown-menu),
.editor-container.theme-light :deep(.milkdown-toolbar) {
  background-color: #ffffff;
  border-color: #e2e8f0;
  color: #0f172a;
}

.editor-container.theme-light :deep(.milkdown-menu-item),
.editor-container.theme-light :deep(.milkdown-toolbar-item) {
  color: #475569;
}

.editor-container.theme-light :deep(.milkdown-menu-item:hover),
.editor-container.theme-light :deep(.milkdown-toolbar-item:hover) {
  background-color: #f1f5f9;
  color: #0f172a;
}

.editor-container.theme-light :deep(.milkdown-input),
.editor-container.theme-light :deep(.milkdown-code) {
  background-color: #ffffff;
  color: #0f172a;
  border-color: #e2e8f0;
}

.editor-container.theme-light :deep(.milkdown-blockquote) {
  border-left-color: #0284c7;
  color: #475569;
}
</style>
