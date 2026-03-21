<template>
  <div class="editor-view" :class="`theme-${themeMode}`">
    <NoteHeader :theme-mode="themeMode" @update:theme-mode="themeMode = $event" @back="goBack" />
    <main class="editor-wrapper">
      <MilkdownEditor :theme-mode="themeMode" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NoteHeader from '../components/editorPage/NoteHeader.vue'
import MilkdownEditor from '../components/editorPage/MilkdownEditor.vue'

const router = useRouter()
const themeMode = ref<'light' | 'dark'>('dark')

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.editor-view {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* 深色主题 */
.editor-view.theme-dark {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --header-bg: #1e293b;
  --card-bg: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --text-tertiary: #94a3b8;
  --accent-color: #0ea5e9;
  --border-color: #334155;
  --button-hover-bg: #334155;
  --button-active-bg: #475569;
}

/* 亮色主题 */
.editor-view.theme-light {
  --bg-primary: #f8fafc;
  --bg-secondary: #f1f5f9;
  --header-bg: #ffffff;
  --card-bg: #ffffff;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-tertiary: #94a3b8;
  --accent-color: #0284c7;
  --border-color: #e2e8f0;
  --button-hover-bg: #f1f5f9;
  --button-active-bg: #e2e8f0;
}

.editor-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: var(--bg-primary);
}

.editor-wrapper::-webkit-scrollbar {
  width: 8px;
}

.editor-wrapper::-webkit-scrollbar-track {
  background: transparent;
}

.editor-wrapper::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 4px;
}

.editor-wrapper::-webkit-scrollbar-thumb:hover {
  background: var(--text-tertiary);
}
</style>
