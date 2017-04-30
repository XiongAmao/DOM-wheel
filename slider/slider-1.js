window.slides = function (element) {
    let $element = $(element)
    let $view = $element.children('.slides-view')
    var count = $element.find('.slide').length
    var currentIndex = 0

    $element.on('mouseenter', function () {
        window.clearInterval(sliderTimeId)
    })
    $element.on('mouseleave', function () {
        autoPlay()
    })

    // sliderNav
    let $ol = $('<ol class="slides-view-nav"></ol>')
    for (let i = 0; i < count; i++) {
        $ol.append(`<li></li>`)
    }
    $element.append($ol)
    let $navLi = $element.find('.slides-view-nav>li')
    $navLi.eq(0).addClass('active')
    $ol.on('click', 'li', function (e) {
        let $clickLi = $(e.currentTarget)
        let index = $clickLi.index()
        goToSlide(index)
    })

    function goToSlide(index) {
        let width = $element.width()
        // 执行时获得，保证用户设置弹性轮播窗口时不会在用户缩放屏幕后滚动距离出现问题
        if (index < 0) {
            index = count - 1
            // 这里没搞懂
        } else if (index >= count) {
            index = 0
            // 当当前index选到最后一个时，我们让下一轮的index为第一个
            let $li = $element.find('.slide').eq(0).clone()
            $li.appendTo($view)
            let lastTransform = - width * count
            // 第一个的时候，transform:translateX为0，
            // 第n个页面显示时，transform:translateX为 (n-1)*width ，最后一轮为新增页面，所以为count
            $view.one("transitionend", function () {
                let oldTransition = $view.css('transition')
                $view.css({
                    transition: 'none',
                    transform: 'translateX(0px)'
                })
                $view.offset()
                // .offset()获取$view元素第一个元素的坐标
                $view.css('transition', oldTransition)
                currentIndex = index
                $li.remove()
            })
            $view.css({
                transform: `transLateX(${lastTransform}px)`
            })
            $navLi.eq(0).addClass('active').siblings().removeClass('active')
            return
        }
        let translateX = - width * index
        $view.css({
            transform: `translateX(${translateX}px)`
        })
        $navLi.eq(index).addClass('active').siblings().removeClass('active')
        currentIndex = index
    }

    function autoPlay() {
        sliderTimeId = setInterval(function () {
            goToSlide(currentIndex + 1)
        }, 3000)
    }
    autoPlay()
}