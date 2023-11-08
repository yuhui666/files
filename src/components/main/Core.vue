<template>
  <el-scrollbar style="padding: 33px;">
    <div v-for="i in mainItems.length" :key="i">
      <h1 style="color: #999999; font-style: oblique">{{mainItems[i - 1].title}}</h1>
      <h3 style="color: #999999">{{mainItems[i-1].sub_title}}</h3>
      <div id="root" class="column-layout">
        <div class="v_col" v-for="j in mainItems[i-1].data.length" :key="j">
          <el-card :body-style="{ padding: '0px' }">
            <div class="horizontal-layout">
              <el-image
                  :src="mainItems[i - 1].data[j - 1].image_path"
                  style="padding: 18px;width: 50%;display: block;"
              />
<!--              http://localhost:5173/src/assets/core/flutter.svg-->
<!--              http://localhost:5173/src/assets/configs/mainItems.json-->
<!--              <img src="@/assets/core/flutter.svg" class="image">-->
<!--              mainItems[i - 1].data[j - 1].image_path = @/assets/core/live.svg-->
              <div style="padding: 10px; width: 50%">
                <span>{{ mainItems[i-1].data[j-1].title }}</span>
<!--                <span>{{ mainItems[i - 1].data[j - 1].image_path }}</span>-->
                <br>
                <span class="subtitle">{{ mainItems[i-1].data[j-1].sub_title }}</span>
                <br>
                <el-button type="info" plain @click="handleButtonClick(j)">查看</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>


<script lang="ts">
import {onMounted, ref} from "vue";
export default {
  setup() {
    const mainItems = ref([]);
    const handleButtonClick = (cardIndex) => {
      console.log(`点击了第 ${cardIndex} 个卡片`);
      this.$router.push('/page');
    }
    onMounted(async () => {
      try {
        const url = 'http://localhost:5173/src/assets/configs/mainItems.json';
        const response = await fetch(url); // 发起HTTP请求
        if (response.ok) {
          const data = await response.json(); // 解析JSON数据
          mainItems.value = data; // 将数据分配给mainItems
        } else {
          console.error('Failed to fetch mainItems.json');
        }
      } catch (error) {
        console.error('Failed to fetch mainItems.json', error);
      }
    });

    return {
      handleButtonClick,
      mainItems // Expose headerData in the return object
    };
  }
}
</script>

<style scoped>
#root {
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.span {
  line-height: 3px;
}

.horizontal-layout {
  display: flex; /* 使用Flex布局 */
  justify-content: space-between; /* 横向布局，均匀分布 */
  align-items: center; /* 垂直居中对齐 */
}

.column-layout {
  column-count: 6; /* 列数 */
  column-gap: 10px; /* 列之间的间距 */
}

.v_col {
  break-inside: avoid; /* 防止单独列的内容被分割 */
  width: calc(16.66% - 10px); /* 计算每列的宽度，减去列之间的间距 */
}

.subtitle {
  font-size: 12px;
  color: #999;
}

.button {
  padding: 0;
  min-height: auto;
  padding: 6px;
}

.image {
  padding: 18px;
  width: 50%;
  display: block;
}
</style>
