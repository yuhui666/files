<template>
  <div>
    <div class="markdown-container">
      <div
          v-html="renderedMarkdown"
          @click="copyCode"
          class="markdown-content dark-code-block"
          ref="markdown"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import MarkdownIt from 'markdown-it';
import Clipboard from 'clipboard';
import {ElMessage} from "element-plus";

export default {
  data() {
    return {
      markdownText: `
\`\`\`javascript
function add(a, b) {
  return a + b;
}
\`\`\`
`,
      renderedMarkdown: '',
    };
  },
  mounted() {
    this.renderMarkdown();
  },
  methods: {
    renderMarkdown() {
      const md = new MarkdownIt();
      this.renderedMarkdown = md.render(this.markdownText);
    },
    copyCode() {
      const clipboard = new Clipboard(this.$refs.markdown, {
        text: () => this.markdownText,
      });

      clipboard.on('success', (e) => {
        ElMessage({
          message: 'copy success !',
          type: 'success',
        })
        e.clearSelection();
        clipboard.destroy();
      });
    },
  },
};
</script>

<style scoped>
.dark-code-block {
  background-color: #333;
  color: #fff;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  cursor: pointer;
}

.dark-code-block:hover {
  background-color: #444;
}

.markdown-content {
  position: relative;
}
</style>
