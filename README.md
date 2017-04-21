# DOM 库

基本需求如下：
```
let items = $('li')

items.on('click', function(){
  console.log('click')

})

items.addClass('hi').removeClass('error')

items.text('你好')

item = $(items.get(0))

item.siblings().removeClass('active').end()
  .addClass('active')

```
