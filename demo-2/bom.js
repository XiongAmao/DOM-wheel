window.$ = function () {
    let array = []
    return array
}

$.bom = {
    openAtCenter: function (width, height, url) {
        // let pageWidth = window.innerWidth ? window.innerWidth : (document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width)
        // let pageHeight = window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height)
        // document.documentElement.clientWidth/clientHeight 不包含 滚动条的宽度
        // 获取页面的高宽 
        let pageWidth = window.innerWidth ? window.innerWidth : screen.width
        let pageHeight = window.innerHeight ? window.innerHeight : screen.height
        console.log("pageH= "+pageHeight,"pageW= "+pageWidth)
        // 兼容firfox
        let top = window.screenTop ? window.screenTop : screenTop
        let left = window.screenLeft ? window.screenLeft : screenLeft
        console.log("Top= "+top,"left= "+left)

        window.open(url, '_blank', `
            width=${width}px,height=${height},
            top=${top + pageHeight/2 - height/2}px,
            left=${left + pageWidth/2 - height/2}px,
        `)
    },

    // search: function () {
        // return 
    // }
}