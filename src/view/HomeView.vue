<template>
  <div class="home-view" :class="`theme-${themeMode}`">
    <HomeHeader :theme-mode="themeMode" @update:theme-mode="themeMode = $event" />
    <SearchBar v-model="searchQuery" />
    <AddButton />
    
    <CategoryTabs :active-tab="activeTab" @update:active-tab="activeTab = $event" />
    <NoteList 
      :notes="filteredNotes"
      :active-tab="activeTab"
      :selected-note-id="selectedNoteId"
      @select-note="selectNote"
      @toggle-favorite="toggleFavorite"
    />
    <div class="footer-info">
      <span class="workspace-name">My Workspace</span>
      <span class="notes-count">{{ notes.length }} NOTES</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import HomeHeader from '../components/homePage/HomeHeader.vue'
import SearchBar from '../components/homePage/searchBar.vue'
import AddButton from '../components/homePage/AddButton.vue'
import CategoryTabs from '../components/homePage/CategoryTabs.vue'
import NoteList from '../components/homePage/NoteList.vue'
import type { Note, TabType } from '../models/note'

const themeMode = ref<'light' | 'dark'>('dark')
const activeTab = ref<TabType>('all')
const selectedNoteId = ref<string>()
const searchQuery = ref('')

const notes = ref<Note[]>([
  {
    id: '1',
    title: 'Project Alpha Roadmap',
    content: 'The core milestones for Q4 include the integration of the new API endpoints and the overhaul of the dashboard UI components...',
    category: 'Work',
    timestamp: Date.now() - 60000,
    isFavorite: true,
    tags: ['Work'],
  }
])

const filteredNotes = computed(() => {
  let result = notes.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(note =>
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    )
  }

  switch (activeTab.value) {
    case 'favorites':
      result = result.filter(note => note.isFavorite)
      break
    case 'pinned':
      result = result.filter(note => note.category === 'Pinned')
      break
  }

  return result
})

const selectNote = (id: string) => {
  selectedNoteId.value = id
}

const toggleFavorite = (id: string) => {
  const note = notes.value.find(n => n.id === id)
  if (note) {
    note.isFavorite = !note.isFavorite
  }
}
</script>

<style scoped>
.home-view {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.home-view.theme-dark {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --header-bg: #1e293b;
  --card-bg: #1e293b;
  --card-hover-bg: #334155;
  --card-active-bg: #0ea5e9;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --text-tertiary: #94a3b8;
  --accent-color: #0ea5e9;
  --border-color: #334155;
  --button-hover-bg: #334155;
  --button-active-bg: #475569;
  --scrollbar-thumb: #475569;
  --scrollbar-thumb-hover: #64748b;
}

.home-view.theme-light {
  --bg-primary: #f8fafc;
  --bg-secondary: #f1f5f9;
  --header-bg: #ffffff;
  --card-bg: #ffffff;
  --card-hover-bg: #f1f5f9;
  --card-active-bg: #e0f2fe;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-tertiary: #94a3b8;
  --accent-color: #0284c7;
  --border-color: #e2e8f0;
  --button-hover-bg: #f1f5f9;
  --button-active-bg: #e2e8f0;
  --scrollbar-thumb: #cbd5e1;
  --scrollbar-thumb-hover: #94a3b8;
}

.footer-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  font-size: 12px;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.workspace-name {
  display: flex;
  align-items: center;
  gap: 6px;
}

.notes-count {
  font-weight: 500;
}
</style>
