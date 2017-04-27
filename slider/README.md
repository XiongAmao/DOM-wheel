# 轮播组件

方法1 ：

1. 可视区域
2. view>div>div*n 
3. 移动div把当前div展示到可视区域
4. 图片隐藏

方法2：

1. 可视区域
2. 创建一个隐藏区域> div*n
3. 每次将隐藏区域的指定图片放到可视区域


css:

```css
overflow:visible ; /* 这个属性指定当它溢出其块级容器时，是否剪裁内容，渲染滚动条或显示内容 */

.view {
  overflow:visible;
  display:flex;
}

.slide{
  width:100%;
  flex-shrink:0;
} 

/* 解决弹性盒缩放问题，flex-shrink:0 关闭这个属性 */ 

/* css3里提供了transform用于移动元素，而不是脱离文档流的absolute  */
```

## JS思路



循环播放时，克隆一份放在最后一份后面 （jq有$.clone方法，用appendTo()插入），下一个跳到这张，且关闭动画，当结束时移除掉这张，返回到第一张，再重新加入动画



trick :

$view.offset() 可以分割两个阶段


