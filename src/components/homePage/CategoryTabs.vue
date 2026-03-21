<template>
  <div class="category-tabs">
    <button 
      v-for="tab in tabs" 
      :key="tab.id"
      class="tab-button"
      :class="{ 'is-active': activeTab === tab.id }"
      @click="$emit('update:activeTab', tab.id)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { TabType } from '../../models/note'

interface Tab {
  id: TabType
  label: string
}

defineProps<{
  activeTab: TabType
}>()

defineEmits<{
  (e: 'update:activeTab', value: TabType): void
}>()

const tabs: Tab[] = [
  { id: 'all', label: 'All Notes' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'pinned', label: 'Pinned' },
]
</script>

<style scoped>
.category-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--border-color);
  padding: 0 16px;
  background-color: var(--bg-secondary);
}

.tab-button {
  flex: 1;
  padding: 12px 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tab-button:hover {
  color: var(--text-primary);
}

.tab-button.is-active {
  color: var(--accent-color);
  border-bottom-color: var(--accent-color);
}
</style>
