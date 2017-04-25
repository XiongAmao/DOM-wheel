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

http://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen



#### 思路：

1. 获取当前window的高宽、距离屏幕左边上边的距离
2. 新窗口距离顶边/左边的距离 =  旧窗口的高或宽  / 2  + 旧窗口到屏幕顶边距离 - 新窗口高或宽 / 2
3. 解决兼容问题



# 需求2：

search(name,value) 方法获得查询字符串 
当不传value时，则返回查询这个名称的结果
当传value时，判断name是否存在，存在则修改value，不存在则在原查询字符串后面新建新的键值对

#### 知识点：

```javascript
string.split(string, number)
// 返回分割出来的字符串组成的数组
// 第一个参数为分割规则的字符串，第二个参数为返回的数组的最大成员数
// 第一个参数如果为''空字符串则分割每个成员，如果省略则返回数组的唯一成员为原字符串
// 如果满足分割规则的部分处于字符串的开头或结尾（即它的前面或后面没有其他字符），则返回数组的第一个或最后一个成员是一个空字符串。
string.slice(startPostion,endPosition)         
// 返回新的字符串，参数为数字，第一个为开始位置，第二个为结束位置，如果为负数则表示结尾开始倒数计算的位置，省略第二个参数则表示到原字符串结束

Object.xxx = yyy
// 点方法为对象的创建键值对或给对应属性赋值
Object[xxx] = yyy 
// 方括号方法为对象的创建键值对或给对应属性赋值

encodeURIComponent(str)
// 将参数转义为UTF-8表示
decodeURIComponent(str)
// 将已编码的URI能识别的转义序列转成原字符
```
#### bug：
当页面一开始没有任何查询字符时，如果通过这个方法设置一个参数就会使里面封装的searchAll()返回的第一个键值对为"":""，会使得reset后面的参数时使整个重新构造的查询字符串出现?=&a=3&b=2&这样的情况
