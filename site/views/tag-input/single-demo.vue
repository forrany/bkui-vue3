<template>
  <div>
    <bk-tag-input
      v-model="state.tags"
      :create-tag-validator="tagValidator"
      :filter-callback="filterFn"
      :list="state.list"
      :max-data="1"
      :tag-tpl="tagTpl"
      :tpl="tpl"
      display-key="nickname"
      placeholder="通过 username 或 sex 搜索列表"
      save-key="username"
      search-key="username"
      trigger="focus"
      allow-create
    />
    <p>
      该例子自定义 filter-callback 通过 username 或 sex 搜索列表，定义 create-tag-validator 只允许创建以 A 开头的标签
    </p>
  </div>
</template>

<script setup>
  import { reactive } from 'vue';

  const state = reactive({
    tags: [],
    list: [
      { username: 'Jack', nickname: '杰克', sex: '男' },
      { username: 'Json', nickname: '杰森', sex: '男' },
      { username: 'Jane', nickname: '简', sex: '女' },
      { username: 'Arman', nickname: '阿尔曼', sex: '女' },
    ],
  });

  const filterFn = (searchValue, searchKey, list) =>
    list.filter(data => {
      if (!searchValue) return list;
      return data.sex === searchValue || data[searchKey].indexOf(searchValue) > -1;
    });

  const tagValidator = value => /^A+/.test(value);

  const tpl = (node, highlightKeyword, h) => {
    const innerHTML = `${highlightKeyword(node.username)} (${node.nickname})`;
    return h('div', { class: 'bk-selector-node' }, [
      h('span', {
        class: 'text',
        innerHTML,
      }),
    ]);
  };

  const tagTpl = (node, h) =>
    h('div', { class: 'tag' }, [
      h('span', {
        class: 'text',
        innerHTML: `<span style="text-decoration: underline;">${node.username}</span> (${node.nickname})`,
      }),
    ]);
</script>
