<script lang="ts">
import { defineComponent, ref, onMounted, Ref } from 'vue';
import Files from '@/components/widget/Files.vue';
import MarkdownViewer from "@/components/main/MarkdownViewer.vue";
import {useRoute, useRouter} from "vue-router";
export default defineComponent({
  components: {MarkdownViewer, Files },

  setup() {
    const filesItemData: Ref<any[]> = ref([]);
    const headerData: Ref<string> = ref("");
    const markdownUrl: Ref<string> = ref("");// Initialize with an empty string
    const router = useRouter()
    const route = useRoute()
    const url = route.query.path;
    const onNodeChange = (itemData) => {
      headerData.value = itemData.data.item_path;
      markdownUrl.value =itemData.data.path;
      router.push({path: `/main/page`,query:{md_path:itemData.data.path}});
      console.log("mdpath"+itemData.data.path)
    };

//传值的json赋值给这里的url
    onMounted(async () => {
      try {
        const response = await fetch(url); // 发起HTTP请求
        if (response.ok) {
          const data = await response.json(); // 解析JSON数据
          filesItemData.value = data.map((item) => ({
            label: item.label,
            children: item.children || [],
          }));
        } else {
          console.error('Failed to fetch defaultDirectory.json');
        }
      } catch (error) {
        console.error('Failed to fetch defaultDirectory.json', error);
      }
    });

    return {
      markdownUrl,
      onNodeChange,
      filesItemData,
      headerData, // Expose headerData in the return object
    };
  },
});
</script>

<template>
  <div id="page">
    <el-container class="title">
      <el-text>Page Title</el-text>
    </el-container>
    <el-container class="container">
      <el-aside class="left" width="200px">
        <Files v-if="filesItemData.length > 0" :files-item-data="filesItemData" @node-click-external="onNodeChange" />
      </el-aside>
      <el-container class="right">
        <el-header class="header">{{ headerData }}</el-header> <!-- Use double curly braces to display headerData -->
        <el-main class="content">
          <markdown-viewer :url="markdownUrl"/>
        </el-main>
        <el-footer class="footer">Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>




<style scoped>
#page {
  flex-direction: column;
  width: 100vw; /* 设置宽度为视口宽度 */
  height: 100vh; /* 设置高度为视口高度 */
}

/* 移除原本的最大宽度设置 */
.title {
  height: 5vh;
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 20px;
}

.container {
  height: 95vh;
  display: flex;
  justify-content: space-between;
}

.left {
  background-color: #000;
  padding: 20px;
  flex: 1;
}

.right {
  border-radius: 20px;
  flex: 3;
  padding: 20px;
}

.header {
  height: 5vh;
  background-color: #0E0E0E;
  color: #ffffff;
  padding: 10px;
  box-shadow: 0 3px 0 rgb(200, 200, 200);
}

.content {
  height: 85vh;
  background-color: #2c2c2c;
  color: #ffffff;
  padding: 10px;
}

.footer {
  height: 5vh;
  background-color: #282828;
  color: #ffffff;
  padding: 10px;
  box-shadow: 0px -3px 2px rgb(0, 0, 0);
}
</style>
