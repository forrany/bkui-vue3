/*
 * Tencent is pleased to support the open source community by making
 * 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) available.
 *
 * Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) is licensed under the MIT License.
 *
 * License for 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition):
 *
 * ---------------------------------------------------
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 * the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

import {
  computed,
  CSSProperties,
  defineComponent,
  h,
  ref,
  type Ref,
  type ComponentInternalInstance,
  type ExtractPropTypes,
} from 'vue';

import { usePrefix } from '@bkui-vue/config-provider';
import { bkTooltips } from '@bkui-vue/directives';
import { Close, Plus } from '@bkui-vue/icon';

import { PositionEnum, tabNavProps, TabTypeEnum, TabPanelProps } from './props';

export type TabNavProps = ExtractPropTypes<typeof tabNavProps & ComponentInternalInstance>;

export type StringOrFunction = ((...args: unknown[]) => unknown) | string;

interface Props extends TabNavProps {
  guid?: string;
}

export default defineComponent({
  name: 'TabNav',
  directives: {
    bkTooltips,
  },
  props: tabNavProps,
  setup(props: Props) {
    const activeRef: Ref<HTMLElement | null> = ref(null);
    const activeBarStyle = computed<CSSProperties>(() => {
      const initStyle: CSSProperties = { width: 0, height: 0, bottom: 0, left: 0 };
      if (!activeRef.value) {
        return initStyle;
      }
      const positionArr: string[] = [PositionEnum.LEFT, PositionEnum.RIGHT];
      if (positionArr.includes(props.tabPosition)) {
        const { clientHeight, offsetTop } = activeRef.value;
        const style: CSSProperties = {
          width: `${props.activeBarSize}px`,
          height: `${clientHeight}px`,
          top: `${offsetTop}px`,
          background: props.activeBarColor,
        };
        if (props.tabPosition === PositionEnum.LEFT) {
          style.right = 0;
        } else {
          style.left = 0;
        }
        return style;
      }
      if (props.type === TabTypeEnum.UNBORDER_CARD) {
        const { clientWidth, offsetLeft } = activeRef.value;
        return {
          width: `${clientWidth}px`,
          height: `${props.activeBarSize}px`,
          left: `${offsetLeft}px`,
          bottom: 0,
          background: props.activeBarColor,
        };
      }
      return initStyle;
    });
    const tableNavList = computed(() => {
      if (!Array.isArray(props.panels) || !props.panels.length) {
        return [];
      }

      const list = [];
      let hasFindActive = false;
      const panels = props.panels as unknown[];
      panels.filter((item: Partial<ComponentInternalInstance>, index: number) => {
        if (!item.props) {
          return null;
        }
        const { name, label, num, closable, visible, disabled, sortable, tips, numDisplayType } = item.props;
        if (!visible) {
          return false;
        }
        if (props.active === name) {
          hasFindActive = true;
        }
        const renderLabel = (label: StringOrFunction) => {
          if (item.slots.label) {
            return h(item.slots.label);
          }
          if ([undefined, ''].includes(label as string)) {
            return `选项卡${index + 1}`;
          }
          if (typeof label === 'string') {
            return label;
          }
          if (typeof label === 'function') {
            return h(label);
          }
          return label;
        };
        list.push({
          name,
          closable,
          visible,
          disabled,
          sortable,
          tips,
          numDisplayType,
          tabLabel: renderLabel(label as StringOrFunction),
          tabNum: num,
        });
        return true;
      });
      if (!hasFindActive && props.validateActive) {
        props.panels[0].props && props.tabChange(props.panels[0].props.name);
      }
      return list;
    });
    const dragenterIndex = ref(-1);
    const dragStartIndex = ref(-1);
    const draggingEle = ref('');

    const distinctRoots = (el1: string, el2: string) => el1 === el2;
    const methods = {
      /**
       * @description  判断拖动的元素是否是在同一个tab。
       *               使用guid，相比 el1.parentNode === el2.parentNode 判断，性能要高
       * @param e {event}  触发的元素
       * @return {boolean}
       */
      handleTabAdd(e: MouseEvent) {
        props.tabAdd(e);
      },
      dragstart(index: number, $event: DragEvent) {
        dragStartIndex.value = index;
        draggingEle.value = props.guid;
        // 拖动鼠标效果
        Object.assign($event.dataTransfer, { effectAllowed: 'move' });
        // $event.dataTransfer.setData('text/plain', index)
        props.tabDrag(index, $event);
      },
      dragenter(index: number) {
        // 缓存目标元素索引，方便添加样式
        if (distinctRoots(draggingEle.value, props.guid)) {
          dragenterIndex.value = index;
        }
      },
      dragend() {
        dragenterIndex.value = -1;
        dragStartIndex.value = -1;
        draggingEle.value = null;
      },
      drop(index: number, sortType: string) {
        // 不是同一个tab，返回——暂时不支持跨tab拖动
        if (!distinctRoots(draggingEle.value, props.guid)) {
          return false;
        }
        props.tabSort(dragStartIndex.value, index, sortType);
      },
      handleTabChange(name: string) {
        props.tabChange(name);
      },
      handleTabRemove(index: number, panel: TabPanelProps) {
        props.tabRemove(index, panel);
      },
    };

    const { resolveClassName } = usePrefix();

    return {
      ...methods,
      activeRef,
      activeBarStyle,
      tableNavList,
      dragenterIndex,
      dragStartIndex,
      draggingEle,
      guid: Math.random().toString(16).substr(4) + Math.random().toString(16).substr(4),
      resolveClassName,
    };
  },
  render() {
    const { active, closable, addable, sortable, sortType, labelHeight, dragstart, dragenter, dragend, drop } = this;
    const renderNavs = () =>
      this.tableNavList.map((item, index) => {
        if (!item) {
          return null;
        }
        const { name, disabled, tabLabel, tabNum, numDisplayType } = item;
        const getNavItemClass = () => {
          const classNames = [this.resolveClassName('tab-header-item')];
          if (disabled) {
            classNames.push(this.resolveClassName('tab-header--disabled'));
          }
          if (active === name) {
            classNames.push(this.resolveClassName('tab-header--active'));
          }
          return classNames.join(' ');
        };
        const getValue = (curentValue, parentValue) => !disabled && (curentValue || parentValue);
        const getCloseTag = (item: TabPanelProps, index: number) => {
          return getValue(item.closable, closable) ? (
            <span
              class={this.resolveClassName('tab-header--close')}
              onClick={(): void => this.handleTabRemove(index, item)}
            >
              <Close />
            </span>
          ) : (
            ''
          );
        };
        const getNumType = () => (['bracket'].includes(numDisplayType) ? `(${tabNum})` : tabNum);
        return (
          <div
            key={name}
            ref={active === name ? 'activeRef' : 'tabLabelRef'}
            class={getNavItemClass()}
            v-bk-tooltips={{ content: item.tips || '', disabled: !item.tips }}
            draggable={getValue(item.sortable, sortable)}
            onClick={() => !disabled && this.handleTabChange(name)}
            onDragend={e => {
              e.preventDefault();
              dragend();
            }}
            onDragenter={e => {
              e.preventDefault();
              dragenter(index);
            }}
            onDragleave={e => {
              e.preventDefault();
            }}
            onDragover={e => {
              e.preventDefault();
            }}
            onDragstart={e => dragstart(index, e)}
            onDrop={e => {
              e.preventDefault();
              drop(index, sortType);
            }}
          >
            {!isNaN(tabNum) ? (
              <div class={this.resolveClassName('tab-header--has-num')}>
                <div class={this.resolveClassName('tab-header--has-num-left')}>{tabLabel}</div>
                <div class={this.resolveClassName('tab-header--has-num-right')}>
                  <div class={this.resolveClassName(`tab-header--has-num-${numDisplayType}`)}>{getNumType()}</div>
                  {getCloseTag?.(item, index)}
                </div>
              </div>
            ) : (
              <div>{tabLabel}</div>
            )}
            {isNaN(tabNum) ? getCloseTag?.(item, index) : ''}
          </div>
        );
      });
    const renderOperation = () => {
      const list = [];
      if (typeof this.$slots.add === 'function') {
        list.push(this.$slots.add?.(h));
      } else if (addable) {
        list.push(
          <div onClick={this.handleTabAdd}>
            <Plus
              style='display:flex;'
              width={26}
              height={26}
            />
          </div>,
        );
      }
      if (list.length) {
        return (
          <div class={this.resolveClassName('tab-header-operation')}>
            {list.map((item, index) => (
              <div
                key={index}
                class={this.resolveClassName('tab-header-item')}
              >
                {item}
              </div>
            ))}
          </div>
        );
      }
      return null;
    };
    const renderActiveBar = () => {
      if (this.type === TabTypeEnum.UNBORDER_CARD) {
        return (
          <div
            style={this.activeBarStyle}
            class={this.resolveClassName('tab-header-active-bar')}
          />
        );
      }
      return '';
    };
    const setting =
      typeof this.$slots.setting === 'function' ? (
        <div class={this.resolveClassName('tab-header-setting')}>{this.$slots.setting()}</div>
      ) : null;
    const operations = renderOperation();

    return (
      <div
        style={{ lineHeight: `${labelHeight}px` }}
        class={this.resolveClassName('tab-header')}
      >
        <div class={[this.resolveClassName('tab-header-nav'), operations || setting ? 'tab-header-auto' : '']}>
          {renderActiveBar()}
          {renderNavs()}
        </div>
        {operations}
        {setting}
      </div>
    );
  },
});
