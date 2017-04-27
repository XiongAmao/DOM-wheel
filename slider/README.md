# 轮播组件

结构：

```
.slides>(.slides-view>.slide*n)+(ol.slides-view-nav>li*n) 
```

其中ol.slides-view-nav 部分为底部导航件，由JS创建。

## JS思路

循环播放：

克隆一份放在最后一份后面 （通过clone()，appendTo()），当切换到这页时，关闭动画，并移除掉这张，同时切到第一张，再重新加入动画。

trick :

$view.offset() 可以分割两个阶段


