<template>
  <div id="dialog_container">
    <bk-button
      class="mr10"
      theme="primary"
      text
      @click="() => (exampleSetting.dialog.isShow = true)"
    >
      嵌套弹框
    </bk-button>
    <bk-dialog
      :is-show="exampleSetting.dialog.isShow"
      :size="'medium'"
      :title="'描述'"
      @closed="() => (exampleSetting.dialog.isShow = false)"
      @confirm="() => (exampleSetting.dialog.isShow = false)"
    >
      <bk-button @click="() => (nestedDialog1.isShow = true)"> 打开嵌套弹框 </bk-button>
      <bk-button
        style="margin-left: 10px"
        @click="() => (nestedDialog2.isShow = true)"
      >
        打开侧弹框
      </bk-button>
    </bk-dialog>

    <bk-dialog
      :is-show="nestedDialog1.isShow"
      @closed="() => (nestedDialog1.isShow = false)"
      @confirm="() => (nestedDialog1.isShow = false)"
    >
      <div>嵌套的弹框内容~</div>
    </bk-dialog>

    <bk-sideslider
      :is-show="nestedDialog2.isShow"
      @closed="() => (nestedDialog2.isShow = false)"
    >
      <div>sideslider</div>
      <bk-button @click="nestedDialog3.isShow = true"> 打开弹窗 </bk-button>
      <bk-dialog
        :is-show="nestedDialog3.isShow"
        @closed="() => (nestedDialog3.isShow = false)"
        @confirm="() => (nestedDialog3.isShow = false)"
      >
        <div>嵌套的弹框内容~</div>
      </bk-dialog>
    </bk-sideslider>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  import BkButton from '@bkui-vue/button';
  import BkDialog from '@bkui-vue/dialog';
  import BkSideslider from '@bkui-vue/sideslider';

  const exampleSetting = ref({
    dialog: {
      isShow: false,
    },
  });

  const nestedDialog1 = ref({
    isShow: false,
  });

  const nestedDialog2 = ref({
    isShow: false,
  });

  const nestedDialog3 = ref({
    isShow: false,
  });
</script>
