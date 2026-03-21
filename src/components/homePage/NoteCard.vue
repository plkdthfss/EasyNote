<template>
  <div class="note-card" :class="{ 'is-active': isActive }">
    <div class="card-header">
      <h3 class="card-title">{{ note.title }}</h3>
      <span class="card-time">{{ formatTime(note.timestamp) }}</span>
    </div>
    
    <p class="card-content">{{ truncateContent(note.content) }}</p>
    
    <div class="card-footer">
      <div class="tags-section">
        <span v-if="note.category" class="tag" :style="{ backgroundColor: getCategoryColor(note.category) }">
          {{ note.category }}
        </span>
      </div>
      <button 
        class="favorite-btn" 
        :class="{ 'is-favorite': note.isFavorite }"
        @click="handleToggleFavorite"
        :title="note.isFavorite ? 'Remove from favorites' : 'Add to favorites'"
      >
        <n-icon :size="16">
          <StarOutline v-if="!note.isFavorite" />
          <Star v-else />
        </n-icon>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StarOutline, Star } from '@vicons/ionicons5'
import type { Note } from '../../models/note'

interface Props {
  note: Note
  isActive?: boolean
}

interface Emits {
  (e: 'click'): void
  (e: 'toggle-favorite', id: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const formatTime = (timestamp: number): string => {
  const now = new Date()
  const noteDate = new Date(timestamp)
  const diffMs = now.getTime() - noteDate.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'JUST NOW'
  if (diffMins < 60) return `${diffMins}M AGO`
  if (diffHours < 24) return `${diffHours}H AGO`
  if (diffDays === 1) return 'YESTERDAY'
  if (diffDays < 7) return `${diffDays}D AGO`
  
  return noteDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()
}

const truncateContent = (content: string): string => {
  const maxLength = 120
  return content.length > maxLength ? content.substring(0, maxLength) + '...' : content
}

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'Work': '#0ea5e9',
    'Personal': '#8b5cf6',
    'Dev': '#10b981',
    'Ideas': '#f59e0b',
  }
  return colors[category] || '#6b7280'
}

const handleToggleFavorite = () => {
  emit('toggle-favorite', props.note.id)
}


</script>

<style scoped>
.note-card {
  padding: 16px;
  border-radius: 8px;
  border-left: 3px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: var(--card-bg);
  color: var(--text-primary);
}

.note-card:hover {
  background-color: var(--card-hover-bg);
  border-left-color: var(--accent-color);
}

.note-card.is-active {
  background-color: var(--card-active-bg);
  border-left-color: var(--accent-color);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 8px;
}

.card-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  flex: 1;
  word-break: break-word;
  line-height: 1.4;
}

.card-time {
  font-size: 11px;
  color: var(--text-secondary);
  white-space: nowrap;
  flex-shrink: 0;
}

.card-content {
  margin: 0 0 12px 0;
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  word-break: break-word;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.tags-section {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  flex: 1;
}

.tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  color: white;
  white-space: nowrap;
}

.favorite-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: color 0.2s ease;
  flex-shrink: 0;
}

.favorite-btn:hover {
  color: var(--accent-color);
}

.favorite-btn.is-favorite {
  color: var(--accent-color);
}
</style>
