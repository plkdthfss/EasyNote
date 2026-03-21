<template>
  <div class="editor-container">
    <div ref="editorRef" class="crepe-editor"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { Crepe } from '@milkdown/crepe';
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";
import '../../../assets/crep-custom.css'

const editorRef = ref(null);
let crepe = null;

onMounted(() => {
  if (editorRef.value) {
    // 初始化 Crepe 编辑器
    crepe = new Crepe({
      root: editorRef.value,
      features: {
        [Crepe.Feature.Toolbar]: true,

      },
      featureConfigs:{
        [Crepe.Feature.BlockEdit]:{
          handleAddIcon: '',
        },
      },
      defaultValue: '# Hello Milkdown!\n这是一段测试内容。尝试输入 `/` 来唤起斜杠菜单。',
    });

    // 创建编辑器
    crepe.create().then(() => {
      console.log('Milkdown Editor 准备就绪');
    });
  }
});

// 组件卸载时销毁实例
onBeforeUnmount(() => {
  crepe?.destroy();
});
</script>

<style scoped>
.editor-container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* 确保编辑器占据整个容器 */
.crepe-editor {
  width: 100%;
  height: 100%;
  min-height: auto;
  overflow-y: auto;
}

/* 移除默认的最大宽度限制 */
.crepe-editor .milkdown {
  max-width: 100%;
  padding: 16px;
}
</style>