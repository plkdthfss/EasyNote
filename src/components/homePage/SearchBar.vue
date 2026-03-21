<template>
    <div class="search-section">
      <div class="search-input-wrapper">
        <n-icon :size="16" class="search-icon">
          <SearchOutline />
        </n-icon>
        <input 
          :value="modelValue"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          type="text" 
          class="search-input"
          placeholder="Search your notes..."
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { SearchOutline } from '@vicons/ionicons5'
  
  defineProps<{
    modelValue: string
  }>()
  
  defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()
  </script>
  
  <style scoped>
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
  </style>