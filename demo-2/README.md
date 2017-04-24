# 需求1：

window.open(url, windowName, windowFeatures)

在页面正中央打开一个指定宽高的 window



#### 知识点：

```javascript
window.open(strUrl, strWindowName, [strWindowFeatures]);

window.innerWidth     // 浏览器显示的页面的宽   包括滚动条
window.innerHeight    // 浏览器显示的页面的高   包括滚动条

document.documentElement.clientWidth    // 文档页面显示的高  不包括滚动条
document.documentElement.clientHeight   // 文档页面显示的高  不包括滚动条

window.screenTop      // window距离顶部的距离
window.screenLeft     // window距离左边的距离
screenX               // window距离屏幕左边的距离 ，火狐使用
screenY               // window距离屏幕顶部的距离 ，火狐使用

screen.width          // 取屏幕宽
screen.height         // 取屏幕高


```

双屏幕解决方案：http://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen
这里面有bug，火狐无法用screen.left || screen.top 来获取window距离顶部和左边的距离

#### 记录

