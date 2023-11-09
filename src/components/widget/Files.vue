<template>
  <div>
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-left: 10px;"/>
    <el-tree
        style="margin-left: 10px; margin-top: 10px;"
        ref="treeRef"
        class="filter-tree"
        :data="filesItemData"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        @node-click="onNodeClick"
    />
  </div>
</template>
<script lang="ts">
import {ref, watch, defineComponent, Ref, onMounted} from 'vue';
import { ElTree } from 'element-plus';
interface Tree {
  children?: Tree[];
  label: string;
}
export default defineComponent({
  props: {
    filesItemData: Array,
  },
  setup(props,{ emit }) {
    const onNodeClick = (node,itemData) => {
      emit('node-click-external', itemData);
    };
    const filterText = ref('');
    const treeRef = ref<InstanceType<typeof ElTree>>()
// const treeRef: Ref<InstanceType<typeof ElTree> | null> = ref(null);
    const defaultProps = {
      children: 'children',
      label: 'label',
    };
    const filterNode = (value: string, data: Tree) => {
      console.log("filterNode","++++++++",value)
      if (!value) return true;
      return data.label.includes(value);
    };

    watch(filterText, (val) => {
      console.log("filterText---------",treeRef,"---------",val,"------------",treeRef.value)
      if (treeRef.value) {
        treeRef.value.filter(val);
        console.log("filter","=========",treeRef.value)
      }
    });
    console.log("aaaaaaaaaaaaaaa",props.filesItemData)
    // 对传入的数据进行格式转换
    const filesItemData = props.filesItemData.map(item => {
      return {
        label: item.label,
        item_path: item.item_path,
        path: item.path,
        children: item.children || [],
      };
    });
    return {
      filterNode,
      defaultProps,
      treeRef,
      filterText,
      filesItemData,
      onNodeClick, // 将事件处理程序暴露给模板
    };
  },
});
</script>
