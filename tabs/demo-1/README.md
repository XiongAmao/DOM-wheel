# tabs 组件

设计图：https://dribbble.com/shots/394345-Little-Tabs/attachments/21609

组件设计基本原则：

1. HTML CSS JS 分离
2. 命名统一
3. 组件可复用
4. 约定标准

组件的CSS可以自定义，暂时没有做优化，需要根据用户使用定制。

组件JS部分需要jQuery库。

基本结构为：

```html
<div class="tabs">
  <ol class="tabs-nav" data-role="tabs-nav">
    <li class="active"></li>
    <li></li>
  </ol>
  <ol class="tabs-panes" data-role="tabs-panes">
    <li class="active"></li>
    <li></li>
  </ol>
</div>
```

