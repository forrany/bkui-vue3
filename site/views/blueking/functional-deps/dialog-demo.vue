<template>
  <functional-dependency
    v-model:showDialog="showDialog"
    :guide-desc-list="[
      '1. 配置平台：ES 服务',
      '2. 蓝鲸监控：监控日志套餐',
      '3. 容器管理平台：容器管理套餐',
      '4. 持续集成平台：持续集成套餐',
    ]"
    functional-desc="使用容器服务，蓝鲸将为您快速搭建、运维和管理容器集群，您可以轻松对容器进行启动、停止等操作，也可以查看集群、容器及服务的状态。"
    guide-title="如需使用该功能，需要部署："
    mode="dialog"
    title="暂无集群容器功能"
  />
  <bk-button
    theme="primary"
    @click="showDialog = true"
  >
    点击显示功能依赖
  </bk-button>
</template>
<script setup lang="ts">
  import { ref } from 'vue';

  import FunctionalDependency from '@blueking/functional-dependency';

  import '@blueking/functional-dependency/vue3/vue3.css';
  const showDialog = ref(false);
</script>
