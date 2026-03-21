<template>
  <div class="home-view" :class="`theme-${themeMode}`">
    <HomeHeader :theme-mode="themeMode" @update:theme-mode="themeMode = $event" />
    
    <div class="search-section">
      <div class="search-input-wrapper">
        <n-icon :size="16" class="search-icon">
          <SearchOutline />
        </n-icon>
        <input 
          v-model="searchQuery"
          type="text" 
          class="search-input"
          placeholder="Search your notes..."
        />
      </div>
    </div>

    <button class="new-note-btn" @click="createNewNote">
      <n-icon :size="18">
        <AddOutline />
      </n-icon>
      <span>New Note</span>
    </button>

    <CategoryTabs 
      :active-tab="activeTab"
      @update:active-tab="activeTab = $event"
    />

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
import { SearchOutline, AddOutline } from '@vicons/ionicons5'
import HomeHeader from '../components/homePage/HomeHeader.vue'
import CategoryTabs from '../components/homePage/CategoryTabs.vue'
import NoteList from '../components/homePage/NoteList.vue'
import type { Note, TabType } from '../models/note'

const themeMode = ref<'light' | 'dark'>('dark')
const activeTab = ref<TabType>('all')
const selectedNoteId = ref<string>()
const searchQuery = ref('')

// Mock data - 在实际应用中应该从存储或API获取
const notes = ref<Note[]>([
  {
    id: '1',
    title: 'Project Alpha Roadmap',
    content: 'The core milestones for Q4 include the integration of the new API endpoints and the overhaul of the dashboard UI components...',
    category: 'Work',
    timestamp: Date.now() - 60000,
    isFavorite: true,
    tags: ['Work'],
  },
  {
    id: '2',
    title: 'Shopping List',
    content: 'Almond milk, Avocados, Coffee beans (Dark Roast), Greek yogurt, and some fresh blueberries for the morning smoothie.',
    category: 'Personal',
    timestamp: Date.now() - 7200000,
    isFavorite: false,
    tags: ['Personal'],
  },
  {
    id: '3',
    title: 'Meeting Notes: UX Sync',
    content: 'Discussion regarding the sidebar contrast levels. Sarah suggested using more primary hue neutrals to keep the branding consistent...',
    category: 'Work',
    timestamp: Date.now() - 86400000,
    isFavorite: false,
    tags: ['Work'],
  },
  {
    id: '4',
    title: 'Gift Ideas for Mom',
    content: 'A new digital photo frame or that specific brand of gardening tools she mentioned last summer when we were at the nursery.',
    category: 'Personal',
    timestamp: Date.now() - 2592000000,
    isFavorite: false,
    tags: ['Personal'],
  },
  {
    id: '5',
    title: 'Quick Links & Resources',
    content: 'https://tailwindui.com/components, https://fonts.google.com/icons, and the internal design documentation on Notion.',
    category: 'Dev',
    timestamp: Date.now() - 2678400000,
    isFavorite: false,
    tags: ['Dev'],
  },
])

const filteredNotes = computed(() => {
  let result = notes.value

  // 按搜索查询过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(note =>
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    )
  }

  // 按标签过滤
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
  // 在实际应用中，这里会导航到编辑器视图
}

const toggleFavorite = (id: string) => {
  const note = notes.value.find(n => n.id === id)
  if (note) {
    note.isFavorite = !note.isFavorite
  }
}

const createNewNote = () => {
  // 在实际应用中，这里会创建新笔记并导航到编辑器
  console.log('Create new note')
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

/* 深色主题 */
.home-view.theme-dark {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --header-bg: #1e293b;
  --card-bg: #1e293b;
  --card-hover-bg: #334155;
  --card-active-bg: #0ea5e9;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-tertiary: #64748b;
  --accent-color: #0ea5e9;
  --border-color: #334155;
  --button-hover-bg: #334155;
  --button-active-bg: #475569;
  --scrollbar-thumb: #475569;
  --scrollbar-thumb-hover: #64748b;
}

/* 亮色主题 */
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

.search-section {
  padding: 12px 12px;
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  transition: all 0.2s ease;
}

.search-input-wrapper:focus-within {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.1);
}

.search-icon {
  color: var(--text-secondary);
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-size: 13px;
  color: var(--text-primary);
  min-width: 0;
}

.search-input::placeholder {
  color: var(--text-tertiary);
}

.new-note-btn {
  margin: 12px;
  padding: 12px 16px;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.new-note-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
}

.new-note-btn:active {
  transform: translateY(0);
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
