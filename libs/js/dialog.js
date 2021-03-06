window.dialog = function (buttonSelector, options) {
    let $button = $(buttonSelector)
    let { title, content, buttons, backgroundSwitch } = options
    console.log(backgroundSwitch)
    let $newDialog = generateHTML()
    let $dialogPage = $newDialog[0]
    let $dialogDiv = $newDialog[1]
    let hasAppended = false
    let switcher = {
        hide: function () {
            $dialogPage.fadeOut()
            $dialogDiv.slideUp()
        },
        show: function () {
            $dialogPage.fadeIn()
            $dialogDiv.slideDown()
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
        let array = []
        let $dialogDivWrapper = $('<div style="display:none;" class="dialog-wrapper fade"></div>')
        let $dialogDiv = $('<div style="display:none" class="dialog"></div>')
            .appendTo($dialogDivWrapper)
        let $header = $('<div class="dialog-header"></div>')
            .appendTo($dialogDiv)
        let $headerH4 = $('<h4 class="dialog-header-title"></h4>')
            .text(title).appendTo($header)
        let $headerButton = $('<div class="dialog-header-button"><span>x<span></div>')
            .on('click', function () {
                switcher.hide()
            })
            .appendTo($header)
        let $content = $('<div class="dialog-content"></div>')
            .text(content).appendTo($dialogDiv)
        let $actionButtons = $('<div class="dialog-actions"></div>')
            .appendTo($dialogDiv)
            
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
        array.push($dialogDivWrapper, $dialogDiv)
        return array
    }


}