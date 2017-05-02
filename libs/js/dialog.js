window.dialog = function (buttonSelector, options) {
    let $button = $(buttonSelector)
    let { title, content, buttons, backgroundSwitch } = options
    let $dialogPage = generateHTML()
    let hasAppended = false
    let switcher = {
        hide: function () {
            $dialogPage.hide()
            $dialogPage.removeClass("in")

        },
        show: function () {
            $dialogPage.show()
            $dialogPage.addClass('in')
        },
    }

    $button.on('click', function () {
        if (!hasAppended) {
            $(document.body).append($dialogPage)
            hasAppended = true
            switcher.show()
        }
        switcher.show()
    })
    // 如果已经把模块插入页面，则只做展示而不是再插入
    if (backgroundSwitch) {
        $dialogPage.on('click', function (e) {
            if (e.target === e.currentTarget) {
                switcher.hide()
            }
        })
    } // 背景开关

    function generateHTML() {
        let $dialogDivWrapper = $('<div class="dialog-wrapper fade"></div>')
        let $dialogDiv = $('<div class="dialog"></div>').appendTo($dialogDivWrapper)
        let $header = $('<div class="dialog-header"></div>').appendTo($dialogDiv)
        let $headerH4 = $('<h4 class="dialog-header-title"></h4>').text(title).appendTo($header)
        let $headerButton = $('<div class="dialog-header-button"><span>x<span></div>').appendTo($header)
        let $content = $('<div class="dialog-content"></div>').text(content).appendTo($dialogDiv)
        let $actionButtons = $('<div class="dialog-actions"></div>')
        $headerButton.on('click', function () {
            switcher.hide()
        })
        for (let i = 0; i < buttons.length; i++) {
            let $insideButton = $('<button></button>')
                .text(buttons[i].text).appendTo($actionButtons)
                .on('click', function () {
                    let action = buttons[i].action
                    let result
                    if (action) {
                        result = action()
                    }
                    result !== false && switcher.hide()
                })
        }
        $actionButtons.appendTo($dialogDiv)
        return $dialogDivWrapper
    }
    $button.trigger('click')

}