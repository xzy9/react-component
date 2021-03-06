### Tabs

| 参数 | 说明 | 类型 | 默认值 |  
| --- | --- | --- | --- |  
| activeKey | 当前激活 tab 面板的 key | string | 无 |
| defaultActiveKey | 初始化选中面板的 key，如果没有设置 activeKey | string | 第一个面板 |
| tabBarStyle | tab bar 的样式对象 | object | - |
| tabPosition | 页签位置，可选值有 `top` `right` `bottom` `left` | string | 'top' |
| type | 页签的基本样式，可选 `line`、`card` 类型 | string | 'line' |
| onChange | 切换面板的回调 | Function | 无 |
| onTabClick | tab 被点击的回调 | Function | 无 |

### Index.TabPane

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 对应 activeKey | string | 无 |
| tab | 选项卡头显示文字 | string / ReactNode | 无 |
| disabled | 选项卡禁用 | boolean | false |