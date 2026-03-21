<template>
  <button class="new-note-btn" @click="handleClick" :title="'Create a new note'">
    <n-icon :size="18">
      <AddOutline />
    </n-icon>
    <span>New Note</span>
  </button>
</template>

<script setup lang="ts">
import { AddOutline } from '@vicons/ionicons5'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleClick = () => {
  router.push('/editor')
}
</script>

<style scoped>
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
</style>
