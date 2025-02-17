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
import { FunctionalComponent } from 'vue';

import BkIcon, { IIconBaseProps } from './icon';
const data = JSON.parse(
  '{"type":"element","name":"svg","attributes":{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 1024 1097.143","style":"width: 1em; height: 1em; vertical-align: middle;fill: currentColor;overflow: hidden;"},"elements":[{"type":"element","name":"path","attributes":{"fill-rule":"evenodd","d":"M698.6857142857143 34.403266925714284C704.0284854857142 39.03491620571429 707.0963821714286 45.75792566857142 707.0963821714286 52.82880841142857L707.0963821714286 1069.3194752C707.0963821714286 1076.3805476571426 704.0330386285714 1083.0943561142856 698.7016923428572 1087.7242075428571 693.3703497142857 1092.3540589714285 686.2936283428571 1094.4451693714284 679.3020964571429 1093.4566180571428L66.26742857142857 1005.9290002285713C42.23585170285714 1002.5063533714285 24.380952502857145 981.9287990857142 24.380952502857145 957.6547145142856L24.380952502857145 164.4935701942857C24.380952502857145 140.21948562285712 42.23585170285714 119.64193024 66.26742857142857 116.21928448L66.31619035428571 116.21928448 679.2533321142857 28.691665554285713C686.252565942857 27.68759990857143 693.3429430857143 29.771617645714286 698.6857142857143 34.403266925714284ZM950.905903542857 122.21699876571428C977.8363611428571 122.21699876571428 999.6678107428571 144.04844726857144 999.6678107428571 170.97890340571428L999.6678107428571 951.1693787428571C999.6678107428571 978.0998363428571 977.8363611428571 999.931285942857 950.905903542857 999.931285942857L755.8582857142857 999.931285942857 755.8582857142857 902.4074751999999 902.1439999999999 902.4074751999999 902.1439999999999 219.74080841142853 755.8582857142857 219.74080841142853 755.8582857142857 122.21699876571428 950.905903542857 122.21699876571428ZM544.5566976 333.5185846857143L154.46146048 333.5185846857143 154.46146048 723.613824 251.98526976 723.613824 251.98526976 626.0900132571428 544.5566976 626.0900132571428 544.5566976 333.5185846857143ZM447.03289051428567 431.0423954285714L447.03289051428567 528.5662061714285 251.98526976 528.5662061714285 251.98526976 431.0423954285714 447.03289051428567 431.0423954285714Z"}}]}',
);
const pptFill: FunctionalComponent<IIconBaseProps> = (props, context) => {
  const p = { ...props, ...context.attrs };
  return (
    <BkIcon
      {...p}
      data={data}
      name='pptFill'
    ></BkIcon>
  );
};

pptFill.displayName = 'pptFill';
pptFill.inheritAttrs = false;

export default pptFill;
