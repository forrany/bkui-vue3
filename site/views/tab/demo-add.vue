<template>
  <div>
    <bk-tab
      v-model:active="active"
      type="card"
      addable
      closable
      @add="addPanel"
      @remove="removePanel"
    >
      <bk-tab-panel
        v-for="(item, index) in panels"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
        {{ item.label }}-{{ index }}
      </bk-tab-panel>
    </bk-tab>
  </div>
</template>
<script>
  import { defineComponent } from 'vue';
  export default defineComponent({
    components: {},
    data() {
      return {
        panels: [
          { name: 'mission', label: '任务报表', count: 10 },
          { name: 'config', label: '加速配置', count: 20 },
          { name: 'history', label: '历史版本', count: 30 },
          { name: 'deleted', label: '已归档加速任务', count: 40 },
        ],
        active: 'mission',
      };
    },
    methods: {
      addPanel() {
        const name = Math.random().toString(16).substring(4, 10);
        this.panels.push({
          name,
          label: `新标签页-${name.substring(0, 4)}`,
          count: 50,
        });
        this.active = name;
      },
      removePanel(index, panel) {
        console.log(panel);
        this.panels.splice(index, 1);
      },
    },
  });
</script>
