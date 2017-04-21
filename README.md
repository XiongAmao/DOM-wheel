# DOM 库

[TOC]

### demo-1

需求如下：

```javascript
let items = $('li')
// 使用$方法传入选择器，可以返回一个内容为元素节点的数组
items.on('click', function(){
  console.log('click')
})
// 返回的items 对象有一个on方法可以传入事件和监听事件回调的方法
items.addClass('hi').removeClass('error')
// 新增一个addClass 和 removeClass方法，并且可以链式调用
items.text('你好')
// 为数组里面每个item 写入text 
items.text() 
// 返回内容
item = $(items.get(0))

// 1. item 没有 siblings 方法
// 2. 需求要有 xxx.siblings 方法
// 3. $item = $(item)   $item.siblings() 返回 item 的兄弟

// 1. $item.siblings() 没有 addClass 方法
// 2. 需求要有  $item.siblings().addClass
// 3. $item.siblings() 的结果是 $('li') 类似的东西

$item.siblings().removeClass('active').end()
  .addClass('active')
```

1. 第一个需求，需要我们通过$方法传入一个需要查询的选择器，并使它返回一个包含查询到结果的数组，这个数组里面是元素和节点：

```javascript
window.$ = function (selectorOrNode) {
    let array = []
    let items = document.querySelectorAll(selectorOrNode)
    for (var i = 0; i < items.length; i++) {
        array.push(items[i])
    }
    return array
}
```

2. 返回的items 对象有一个on方法可以传入事件和监听事件回调的方法

```javascript
array.on = function(eventType, fnc){
  for(var i = 0; i < items.length; i++){
    array[i].addEventListener(eventType, fnc)
  }
}
```

3. 新增一个addClass 和 removeClass方法，并且可以链式调用

```javascript
array.addClass = function (value) {
  for (var i = 0; i < array.length; i++) {
    array[i].classList.add(value)
  }
  return array
}
array.removeClass = function (value) {
  for (var i = 0; i < array.length; i++) {
    array[i].classList.remove(value)
  }
  return array
}
```

这里还有两个问题，如果传值为空，会传入一个undefined 作为参数，此时不应该给原数组做任何操作，我们修改一下：

```javascript
array.addClass = function (className) {
  if (className !== undefined) {
    for (var i = 0; i < array.length; i++) {
      array[i].classList.add(className)
    }
  }
  return array
}
array.removeClass = function (className) {
  if (className !== undefined) {
    for (var i = 0; i < array.length; i++) {
      array[i].classList.remove(className)
    }
  }
  return array
}
```

4. 新增一个text方法，用于修改数组里面元素的内容，同时当不传值时，以数组形式返回里面的内容，这里有2个问题：
   1. 如果使用contentText的方法会将元素内所有内容覆盖，寻找是否有其他方法，或者新建不同的方法用来区别用途，否则该方法只适用于没有子元素的元素
   2. 返回的不是原数组

```javascript
array.text = function (text) {
  if (text !== undefined) {
    for (var i = 0; i < array.length; i++) {
      array[i].textContent = text  //这个方法有局限
    }
    return array
  }else{
    let result = []
    for(var i =0; i< array.length;i++){
      result.push(array[i].textContent)
    }
    return result
  }
}
```

5. 下一个需求，如果传入的是一个元素/或者节点，此时需要返回包含这个元素的数组，且可以调用前面的方法，或者传入的是一个数组，则将每个数组里面如果是元素的部分组成新的数组，用于调用$里面数组的方法：

```javascript
window.$ = function (selectorOrNode) {
    let array = []
    if (typeof selectorOrNode === 'string') {
        let items = document.querySelectorAll(selectorOrNode)
        for (var i = 0; i < items.length; i++) {
            array.push(items[i])
        }
    } else if (selectorOrNode instanceof Element) {
        array.push(selectorOrNode)
    } else if (selectorOrNode instanceof Array) {
        for (var i = 0; i < selectorOrNode.length; i++) {
            if (selectorOrNode[i] instanceof Element) {
                array.push(selectorOrNode[i])
            }
        }
    }

    array.on = function (eventType, fnc) {
        for (var i = 0; i < array.length; i++) {
            array[i].addEventListener(eventType, fnc)
        }
        return array
    }
    array.addClass = function (className) {
        if (className !== undefined) {
            for (var i = 0; i < array.length; i++) {
                array[i].classList.add(className)
            }
        }
        return array
    }
    array.removeClass = function (className) {
        if (className !== undefined) {
            for (var i = 0; i < array.length; i++) {
                array[i].classList.remove(className)
            }
        }
        return array
    }
    array.text = function (text) {
        if (text !== undefined) {
            for (var i = 0; i < array.length; i++) {
                array[i].textContent = text
            }
            return array
        } else {
            let result = []
            for (var i = 0; i < array.length; i++) {
                result.push(array[i].textContent)
            }
            return result
        }
    }
    return array
}
```

6. 再加一个get方法获取数组中的子元素：

```javascript
array.get = function(index){
  return array[index]
}
```

7. 新增获取一个元素的兄弟元素的方法sibling()，且可以链式调用子方法end()返回原数组：

```javascript
array.siblings = function(){
  let sibling = array[0].parentNode.children
  // 该方法只用作判断元素的兄弟姐妹，所以传入的是一个数组，该数组里面只有一个元素，即需要判断兄弟姐妹的那个元素
  let result = []
  for(var i = 0 ;i<sibling.length;i++){
    if(sibling[i] !== array[0]){
      result.push(sibling[i])
    }
  }
  let items = $(result)
  // 递归保证结果依然能使用$里面的数组方法
  items.previousSelection = array
  // 附加一个属性为执行该方法前的数组，用于后面的end()方法返回原数组
  return items 
}
array.end = function (){
  return array.previousSelection
}
```





#### 学习过程中遇到的问题：

1. for循环遍历时，addClass，on，removeClass方法都用错了长度，用了item.length，导致出现了bug