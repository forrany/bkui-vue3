<template>
  <div style="text-align: left">
    <div class="bk-popover-position-top">
      <bk-popover
        :popover-delay="[300, 0]"
        content="Top Left 文字提示"
        placement="top-start"
        theme="light"
      >
        <bk-button>上左</bk-button>
      </bk-popover>
      <bk-popover
        :popover-delay="[300, 0]"
        content="Top Center 文字提示"
        theme="light"
      >
        <bk-button>上边</bk-button>
      </bk-popover>
      <bk-popover
        :popover-delay="[300, 0]"
        content="Top Right 文字提示"
        placement="top-end"
        theme="light"
      >
        <bk-button>上右</bk-button>
      </bk-popover>
    </div>

    <div class="bk-popover-position-center">
      <div class="bk-popover-position-center-left">
        <bk-popover
          :popover-delay="[300, 0]"
          placement="left-start"
          theme="light"
        >
          <bk-button>左上</bk-button>
          <template #content>
            <div>Left</div>
            <div>Top</div>
            <div>文字提示</div>
          </template> </bk-popover
        ><br /><br />

        <bk-popover
          :popover-delay="[300, 0]"
          placement="left"
          theme="light"
        >
          <bk-button>左边</bk-button>
          <template #content>
            <div>Left</div>
            <div>Center</div>
            <div>文字提示</div>
          </template> </bk-popover
        ><br /><br />

        <bk-popover
          :popover-delay="[300, 0]"
          placement="left-end"
          theme="light"
        >
          <bk-button>左下</bk-button>
          <template #content>
            <div>Left</div>
            <div>Bottom</div>
            <div>文字提示</div>
          </template>
        </bk-popover>
      </div>

      <div class="bk-popover-position-center-right">
        <bk-popover
          :popover-delay="[300, 0]"
          placement="right-start"
          theme="light"
        >
          <bk-button>右上</bk-button>
          <template #content>
            <div>Right</div>
            <div>Top</div>
            <div>文字提示</div>
          </template> </bk-popover
        ><br /><br />

        <bk-popover
          :popover-delay="[300, 0]"
          placement="right"
          theme="light"
        >
          <bk-button>右边</bk-button>
          <template #content>
            <div>Right</div>
            <div>Center</div>
            <div>文字提示</div>
          </template> </bk-popover
        ><br /><br />

        <bk-popover
          :popover-delay="[300, 0]"
          placement="right-end"
          theme="light"
        >
          <bk-button>右下</bk-button>
          <template #content>
            <div>Right</div>
            <div>Bottom</div>
            <div>文字提示</div>
          </template>
        </bk-popover>
      </div>
    </div>

    <div class="bk-popover-position-bottom">
      <bk-popover
        content="Bottom Left 文字提示"
        placement="bottom"
        theme="light"
      >
        <bk-button>下左</bk-button>
      </bk-popover>
      <bk-popover
        content="Bottom Center 文字提示"
        placement="bottom"
        theme="light"
      >
        <bk-button>下边</bk-button>
      </bk-popover>
      <bk-popover
        content="Bottom Right 文字提示"
        placement="bottom-end"
        theme="light"
      >
        <bk-button>下右</bk-button>
      </bk-popover>
    </div>
  </div>
</template>

<style lang="postcss">
  .bk-popover-position-top,
  .bk-popover-position-bottom {
    margin-left: 80px;
  }

  .bk-popover-position-top div ~ div {
    margin-left: 10px;
  }

  .bk-popover-position-bottom div ~ div {
    margin-left: 10px;
  }

  .bk-popover-position-center {
    margin: 10px auto;
  }

  .bk-popover-position-center-left {
    display: inline-block;
  }

  .bk-popover-position-center-right {
    display: inline-block;
    margin-left: 250px;
  }
</style>
