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

$.bom = {
    openAtCenter: function (width, height, url) {
        // let pageWidth = window.innerWidth ? window.innerWidth : (document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width)
        // let pageHeight = window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height)

        // document.documentElement.clientWidth/clientHeight 不包含 滚动条的宽度
        // 获取window或者的viewport的高宽 
        let pageWidth = window.innerWidth ? window.innerWidth : screen.width
        let pageHeight = window.innerHeight ? window.innerHeight : screen.height
        console.log("pageH= " + pageHeight, "pageW= " + pageWidth)
        // 兼容firfox
        let top = window.screenTop ? window.screenTop : screenY
        let left = window.screenLeft ? window.screenLeft : screenX
        console.log("Top= " + top, "left= " + left)

        window.open(url, '_blank', `
            width=${width}px,height=${height},
            top=${top + pageHeight / 2 - height / 2}px,
            left=${left + pageWidth / 2 - height / 2}px,
        `)
    },

    search: function (name, value) {
        let searchAll = function () {
            let originalSearch = window.location.search
            let searchResult = {}
            if (originalSearch === "") {
                return searchResult
            } else {
                if (originalSearch[0] === '?') {
                    originalSearch = originalSearch.slice(1)
                }
                let searchArray = originalSearch.split('&')

                for (var i = 0; i < searchArray.length; i++) {
                    let parts = searchArray[i].split('=')
                    // 把每个查询字符串？的前后分割成一个数组，取前后作为键名和键值
                    searchResult[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1] || "")
                    // 如果原本不存在值则给它一个空字符串
                    // 将已编码的部分转成原字符，保证获取的参数键值对原字符
                }
                delete searchResult[""] //保证所有结果里面没有空字符串作为对象，以免出现只有拼接符
                return searchResult
            }
        }

        function isEmptyObject(obj) {
            for (var key in obj) {
                return false;
            }
            return true
        }  // 判断一个对象是否为空


        let result = searchAll()
        // 只做一次调用以免反复获取
        if (name === undefined) {
            return result
            // 当不传name时返回当前查询字符串组成的对象
            // 不进行页面刷新

            // 这里算是闭包，可能有性能问题？
        } else if (value === undefined) {
            return result[name]
            // 当不传value时，返回匹配name的查询结果
        } else {
            if (result[name] === undefined) {
                // 判断name是否存在于当前search里，如果没有，则直接在后面附加
                if (isEmptyObject(result)) { // 当对象为空时，开头不加&
                    location.search += `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
                } else {
                    location.search += `&${encodeURIComponent(name)}=${encodeURIComponent(value)}`
                }
            } else {
                // 如果name存在，构造新的search
                let newSearch = "?"

                result[name] = encodeURIComponent(value)
                // 替换属性
                // 构造一个新的search，遍历
                for (let key in result) {
                    if (key !== undefined) {
                        newSearch += `${encodeURIComponent(key)}=${encodeURIComponent(result[key])}&`
                    }
                }
                location.search = newSearch

            }
        }
    }
}