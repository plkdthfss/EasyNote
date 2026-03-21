<template>
  <div class="note-list">
    <div v-if="filteredNotes.length === 0" class="empty-state">
      <n-icon :size="48" color="var(--text-secondary)">
        <DocumentOutline />
      </n-icon>
      <p class="empty-text">No notes yet</p>
      <p class="empty-subtext">Create your first note to get started</p>
    </div>

    <div v-else class="notes-container">
      <div
        v-for="note in filteredNotes"
        :key="note.id"
        @click="$emit('select-note', note.id)"
      >
        <NoteCard 
          :note="note"
          :is-active="selectedNoteId === note.id"
          @toggle-favorite="$emit('toggle-favorite', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DocumentOutline } from '@vicons/ionicons5'
import NoteCard from './NoteCard.vue'
import type { Note, TabType } from '../../models/note'

interface Props {
  notes: Note[]
  activeTab: TabType
  selectedNoteId?: string
}

interface Emits {
  (e: 'select-note', id: string): void
  (e: 'toggle-favorite', id: string): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const filteredNotes = computed(() => {
  switch (props.activeTab) {
    case 'favorites':
      return props.notes.filter(note => note.isFavorite)
    case 'pinned':
      return props.notes.filter(note => note.category === 'Pinned')
    case 'all':
    default:
      return props.notes
  }
})
</script>

<style scoped>
.note-list {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: var(--text-secondary);
}

.empty-text {
  margin: 16px 0 8px 0;
  font-size: 14px;
  font-weight: 500;
}

.empty-subtext {
  margin: 0;
  font-size: 12px;
  color: var(--text-tertiary);
}

.notes-container {
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 8px 0;
}

.notes-container > div {
  padding: 0 8px;
}

/* 滚动条样式 */
.note-list::-webkit-scrollbar {
  width: 6px;
}

.note-list::-webkit-scrollbar-track {
  background: transparent;
}

.note-list::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
  border-radius: 3px;
}

.note-list::-webkit-scrollbar-thumb:hover {
  background: var(--scrollbar-thumb-hover);
}
</style>
