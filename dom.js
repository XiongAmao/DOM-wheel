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
        for (var i = 0; i < array.length; i++) {
            if (className !== undefined) {
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
    array.get = function (index) {
        return array[index]
    }
    array.siblings = function () {
        let sibling = array[0].parentNode.children
        // 该方法只用作判断元素的兄弟姐妹，所以传入的是一个数组，该数组里面只有一个元素，即需要判断兄弟姐妹的那个元素
        let result = []
        for (var i = 0; i < sibling.length; i++) {
            if (sibling[i] !== array[0]) {
                result.push(sibling[i])
            }
        }
        let items = $(result)
        // 递归保证结果依然能使用$里面的数组方法
        items.previousSelection = array
        // 附加一个属性为执行该方法前的数组，用于后面的end()方法返回原数组
        return items
    }
    array.end = function () {
        return array.previousSelection
    }
    return array
}