window.tabs = function (element) {
    let $tabs = $(element)
    let selector = 'ol[data-role="tabs-nav"]>li'
    $tabs.on('click', selector, function (e) {
        let $li = $(e.currentTarget)
        // 使用currentTarget 保正指向this，即li标签，使后面可以复用变量$li，对li进行操作 
        let index = $li.index()
        $li.addClass('active').siblings().removeClass('active')
        $li.closest('ol[data-role="tabs-nav"]').siblings('ol[data-role="tabs-panes"]')
            .find('li').eq(index).addClass('active').siblings().removeClass('active')
    })
    $tabs.find('ol[data-role="tabs-nav"]>li').eq(0).addClass("active").end().end().find('ol[data-role="tabs-panes"]>li').eq(0).addClass('active')
    // 给第一个li active
}

