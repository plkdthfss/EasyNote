<template>
  <div class="app-container">
    <NoteHeader />
    
    <main class="editor-wrapper">
      <MilkdownEditor />
    </main>
  </div>
</template>

<script setup>
import NoteHeader from "../components/editorPage/NoteHeader.vue";
import MilkdownEditor from "../components/editorPage/MilkdownEditor.vue";
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #fff; 
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh; 
}

.editor-wrapper {
  flex: 1; 
  overflow-y: auto;
  padding: 20px;
}

.milkdown {
  max-width: 900px;
  margin: 0 auto;
}
</style>