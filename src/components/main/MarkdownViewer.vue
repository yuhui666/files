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
import {onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
export default {
  props:{
    url:String
  },
  setup(props) {
    const markdownText = "";
    const renderedMarkdown = ref("");
    const router = useRouter()
    const route = useRoute()
    const url = route.query.path;
    const renderMarkdown = () => {
      const md = new MarkdownIt();
      renderedMarkdown.value = md.render(this.markdownText);
    }
    const copyCode = () => {
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
    }
    console.log("==============","url:"+url)
    watch(props, (val) => {
      console.log(val)
    });
    onMounted(async () => {
      try {
        console.log("----------------","url:"+url)
        const response = await fetch(url); // 发起HTTP请求
        if (response.ok) {
          // 解析JSON数据
          this.markdownText = await response.formData().toString();
        } else {
          console.error('Failed to fetch defaultDirectory.json');
        }
      } catch (error) {
        console.error('Failed to fetch defaultDirectory.json', error);
      }
    });

    return {
      renderedMarkdown,
      renderMarkdown,
      copyCode,
      markdownText,
    };
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
