<template>
  <div>
    <bk-tag-input
      v-model="state.tags"
      :list="state.list"
      :paste-fn="pasteFn"
      placeholder="请选择城市"
    />
    <p>复制内容 guangzhou|chongqing|beijing 来体验粘贴多输入效果</p>
  </div>
</template>

<script setup>
  import { reactive } from 'vue';

  const state = reactive({
    tags: ['shenzhen'],
    list: [
      { id: 'shenzhen', name: '深圳' },
      { id: 'guangzhou', name: '广州' },
      { id: 'beijing', name: '北京' },
      { id: 'shanghai', name: '上海' },
      { id: 'hangzhou', name: '杭州' },
      { id: 'nanjing', name: '南京' },
      { id: 'chongqing', name: '重庆' },
      { id: 'taibei', name: '台北' },
      { id: 'haikou', name: '海口' },
    ],
  });
  const pasteFn = value => value.split('|').map(tag => ({ id: tag, name: tag }));
</script>
