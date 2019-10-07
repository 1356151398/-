/*
set{
    target: '', //必须要填的目标
    inPath: '', //必填 里图的路径
    outPath: '', //必填 外图的路径
    width: '', //宽度 默认100%
    height: '', //高度 默认100%
    model: '', //默认horizontal  可选vertical  决定动画样式
    words: '', //右下角小字，不填即没有
    distance: '', //主动画结束后 图片移动距离 默认5%
    direction: '', //主动画结束后 图片移动方向(up, left, right, down) ,horizontal对应left,right ;vertical对应up,down ;不然会露底
    moveDuration: '', //主动画结束后 图片移动时间 默认5000ms
    startPrecent: '', //展示部分的开始百分比  默认为从左往右(从上往下)的10%
    endPrecent: '', //展示部分的结束百分比  默认为从左往右(从上往下)的30%
}
*/

function initGuiMieAnime(set) {
    let guiDiv = set.target
    let inPath = set.inPath
    let outPath = set.outPath
    let words = set.words
    let width = set.width
    let height = set.height

    width ? '' : width = '100%'
    height ? '' : height = '100%'
    inPath ? inPath = "background-image: url(" + inPath + ")" : inPath = ''
    outPath ? outPath = "background-image: url(" + outPath + ")" : outPath = ''
    words ? '' : words = ''
    $(guiDiv).append("<div class='zhe0' style='" + inPath + "'></div>")
    $(guiDiv).append("<div class='zhe1' style='" + outPath + "'></div>")
    $(guiDiv).append("<div class='zhe2'></div>")
    $(guiDiv).append("<div class='zhe3'></div>")
    $(guiDiv).append("<div class='zhe4'></div>")
    $(guiDiv).append("<div class='zhe5'>" + words + "</div>")

    anime.set(guiDiv, {
        width: width,
        height: height
    })
    return getGuiMieAnime(guiDiv, set)
}

//浏览器窗口大小变化时
$(window).resize(function () {
    let items = $(".guiDiv")
    for (let i = 0; i < items.length; ++i) {
        let zhe0 = $(items[i]).children('.zhe0')[0]
        let zhe1 = $(items[i]).children('.zhe1')[0]
        let width = $(items[i]).width() + 'px'
        let height = $(items[i]).height() + 'px'
        let size = width + ' ' + height
        anime.set([zhe0, zhe1], {
            backgroundSize: size,
            backgroundRepeat: 'no-repea'
        })
    }
})

function getGuiMieAnime(guiDiv, set) {
    if (!set.model) set.model = 'horizontal'
    var zhe0 = $(guiDiv).children('.zhe0')[0];
    var zhe1 = $(guiDiv).children('.zhe1')[0];
    var zhe2 = $(guiDiv).children('.zhe2')[0];
    var zhe3 = $(guiDiv).children('.zhe3')[0];
    var zhe4 = $(guiDiv).children('.zhe4')[0];
    var zhe5 = $(guiDiv).children('.zhe5')[0];
    let width = $(guiDiv).width() + 'px'
    let height = $(guiDiv).height() + 'px'
    let size = width + ' ' + height
    anime.set([zhe0, zhe1], {
        backgroundSize: size,
        backgroundRepeat: 'no-repea'
    })
    if (set.model == 'horizontal') {
        guiMieInit(zhe1, zhe2, zhe3, zhe4, zhe5);
        return guiMie(zhe1, zhe2, zhe3, zhe4, zhe5, set)
    } else if (set.model == 'vertical') {
        guiMieInit2(zhe1, zhe2, zhe3, zhe4, zhe5);
        return guiMie2(zhe1, zhe2, zhe3, zhe4, zhe5, set)
    }
}

function resetGuiMieAnime(anime) {

    anime.pause()
    anime.seek(0)
}

function guiMieInit(zhe1, zhe2, zhe3, zhe4, zhe5) {
    anime.remove([zhe1, zhe2, zhe3, zhe4])

    anime.set(zhe1, {
        width: '100%',
        translateX: '0px'
    })

    anime.set(zhe2, {
        right: '-130%',
    })

    anime.set(zhe3, {
        width: '0%',
    })

    anime.set(zhe4, {
        width: '100%',
    })

    anime.set(zhe5, {
        opacity: '0',
        right: '10%',
        bottom: '10%',
    })
}

function guiMie(zhe1, zhe2, zhe3, zhe4, zhe5, set) {
    let distance = set.distance
    let direction = set.direction
    let startPrecent = set.startPrecent
    let endPrecent = set.endPrecent
    let moveDuration = set.moveDuration
    moveDuration ? '' : moveDuration = '5000'
    startPrecent ? '' : startPrecent = '10%'
    endPrecent ? '': endPrecent = '30%'
    distance ? '' : distance = '5%'

    let x = '0'
    let y = '0'
    switch (direction) {
        case 'left':
            x = '-' + distance
            break;
        case 'right':
            x = distance
            break;
        case 'up':
            y = '-' + distance
            break;
        case 'down':
            y = distance
            break;
        default:
            x = '-' + distance
    }

    var tl = anime.timeline({
        easing: 'linear',
        autoplay: false,
        complete: function () {
            if ($(zhe1).parent().hasClass('back')) {
                anime({
                    targets: zhe1,
                    width: ['100%', '100%'],
                    translateX: 0,
                    translateY: 0,
                    duration: moveDuration,
                    easing: 'linear',
                    loop: true,
                    direction: 'alternate',
                    autoplay: true
                })
            }
        }
    });

    tl.add({
        targets: zhe1,
        width: '10%',
        duration: 300,
    })
    tl.add({
        targets: zhe1,
        width: '40%',
        duration: 100
    })

    tl.add({
        targets: zhe2,
        right: '-40%',
        duration: 300
    }, 0)
    tl.add({
        targets: zhe2,
        right: '-20%',
        duration: 100
    }, 300)
    tl.add({
        targets: zhe2,
        right: '-' + endPrecent,
        duration: 100
    }, 400)

    tl.add({
        targets: zhe3,
        width: startPrecent,
        duration: 150
    }, 400)

    tl.add({
        targets: zhe4,
        width: ['100%', '40%'],
        duration: 300,

    }, 0)

    tl.add({
        targets: zhe5,
        opacity: [0, 1],
        duration: 500
    })

    tl.add({
        targets: zhe1,
        width: ['100%', '100%'],
        translateX: x,
        translateY: y,
        duration: moveDuration,
        easing: 'linear'
    }, 550)

    return tl
}

function guiMieInit2(zhe1, zhe2, zhe3, zhe4, zhe5) {
    anime.remove([zhe1, zhe2, zhe3, zhe4])

    anime.set(zhe1, {
        height: '100%',
        translateY: '0px'
    })

    anime.set(zhe2, {
        right: '0%',
        bottom: '-130%',
    })

    anime.set(zhe3, {
        width: '100%',
        height: '0%',
    })

    anime.set(zhe4, {
        height: '100%',
    })

    anime.set(zhe5, {
        opacity: '0',
        right: '10%',
        bottom: '10%',
    })
}

function guiMie2(zhe1, zhe2, zhe3, zhe4, zhe5 ,set) {
    let distance = set.distance
    let direction = set.direction
    let startPrecent = set.startPrecent
    let endPrecent = set.endPrecent
    let moveDuration = set.moveDuration
    moveDuration ? '' : moveDuration = '5000'
    startPrecent ? '' : startPrecent = '10%'
    endPrecent ? '': endPrecent = '30%'
    distance ? '' : distance = '5%'

    let x = '0'
    let y = '0'
    switch (direction) {
        case 'left':
            x = '-' + distance
            break;
        case 'right':
            x = distance
            break;
        case 'up':
            y = '-' + distance
            break;
        case 'down':
            y = distance
            break;
        default:
            y = '-' + distance
    }

    var tl = anime.timeline({
        easing: 'linear',
        autoplay: false,
        complete: function () {
            if ($(zhe1).parent().hasClass('back')) {
                anime({
                    targets: zhe1,
                    width: ['100%', '100%'],
                    translateX: 0,
                    translateY: 0,
                    duration: moveDuration,
                    easing: 'linear',
                    loop: true,
                    direction: 'alternate',
                    autoplay: true
                })
            }
        }
    });

    tl.add({
        targets: zhe1,
        height: '10%',
        duration: 300,
    })
    tl.add({
        targets: zhe1,
        height: '40%',
        duration: 100
    })

    tl.add({
        targets: zhe2,
        bottom: '-40%',
        duration: 300
    }, 0)
    tl.add({
        targets: zhe2,
        bottom: '-20%',
        duration: 100
    }, 300)
    tl.add({
        targets: zhe2,
        bottom: '-' + endPrecent,
        duration: 100
    }, 400)

    tl.add({
        targets: zhe3,
        height: startPrecent,
        duration: 150
    }, 400)

    tl.add({
        targets: zhe4,
        height: ['100%', '40%'],
        duration: 300,

    }, 0)

    tl.add({
        targets: zhe5,
        opacity: [0, 1],
        duration: 500
    })

    tl.add({
        targets: zhe1,
        height: ['100%', '100%'],
        translateX: x,
        translateY: y,
        duration: moveDuration,
        easing: 'linear',
    }, 550)

    return tl
}