<template>
  <header class="home-header">
    <div class="header-content">
      <div class="left-section">
        <n-icon :size="20" class="logo-icon">
          <DocumentTextOutline />
        </n-icon>
        <span class="title-text">Notes List</span>
      </div>

      <div class="right-section">
        <button class="icon-button" @click="toggleTheme" :title="isDark ? 'Light mode' : 'Dark mode'">
          <n-icon :size="18">
            <SunnyOutline v-if="isDark" />
            <MoonOutline v-else />
          </n-icon>
        </button>
        <button class="icon-button" :title="'Settings'">
          <n-icon :size="18">
            <SettingsOutline />
          </n-icon>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DocumentTextOutline, SettingsOutline, MoonOutline, SunnyOutline } from '@vicons/ionicons5'

interface Props {
  themeMode: 'light' | 'dark'
}

interface Emits {
  (e: 'update:themeMode', value: 'light' | 'dark'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isDark = computed(() => props.themeMode === 'dark')

const toggleTheme = () => {
  emit('update:themeMode', isDark.value ? 'light' : 'dark')
}
</script>

<style scoped>
.home-header {
  height: 56px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 12px;
  box-sizing: border-box;
  background-color: var(--header-bg);
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}

.header-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.logo-icon {
  color: var(--accent-color);
  flex-shrink: 0;
}

.title-text {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  border-radius: 4px;
  transition: all 0.2s ease;
}

.icon-button:hover {
  background-color: var(--button-hover-bg);
  color: var(--text-primary);
}

.icon-button:active {
  background-color: var(--button-active-bg);
}
</style>