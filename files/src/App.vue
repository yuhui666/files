<script setup>
import Page from "@/components/main/page.vue";
import Test from "@/components/test.vue";
import Core from "@/components/main/Core.vue";
</script>
<template>
  <div id="app">
      <main>
        <Core/>
<!--        <test/>-->
      </main>
  </div>
</template>

<style>
body {
  max-width: none !important;
}
*{
  max-width: none;
}
#app {
  max-width: none;
  min-width: 0px;
  height: 100%; /* 让#app占据整个视口高度 */
  width: 100%; /* 让#app占据整个视口宽度 */
  background: rgb(0, 0, 0);
  margin: 0; /* 去除外边距 */
  padding: 0; /* 去除内边距 */
}
</style>




<script>

</script>

