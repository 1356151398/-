# Kimetsu-no-Yaiba-Animation
一个鬼灭之刃中场动画效果的模板，用来展示单独的东西效果不错
# 使用说明
## 环境需求
参照demo
~~~
<link rel="stylesheet" type="text/css" href="../css/guiMie.css" />
<script type="text/javascript" src="../js/jquery.1.12.4.min.js"></script>
<script src="../js/anime.min.js"></script>
<script src="../js/guiMie.js"></script>
~~~
## 使用方式
在需要的地方加入下面这段代码
~~~
<div class="guiDiv">
</div>
~~~
在适当的时候进行初始化和动画播放
~~~
var anSet1 = {
                target: $('.guiDiv')[0], //必要的目标
                words: '炭治郎', //anything
                inPath: '../images/joke2.png',//必要 里图
                outPath: '../images/joke1.png',//必要 外图
                width: '480px',// 默认100%
                height: '270px',// 默认100%
            }

let an1 = initGuiMieAnime(anSet1) //初始化动画

$($('.guiDiv')[0]).hover(function(){
                    an1.play()//播放动画
                }, function(){
                    resetGuiMieAnime(an1)//重置动画
                })
~~~
# 效果展示
https://1356151398.github.io/Kimetsu-no-Yaiba-Animation/html/test.html
