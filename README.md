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
## 图片要求
如果想要实现鬼灭之刃中场动画效果的话。。。
1. 准备一张图
2. 用ps打开,并将想要突出的部分移动到10%~30%(默认,具体根据个人设置)的位置,多余部分涂黑或者直接剪掉
3. 导出一张彩色的外图和一张反相的里图,分别对应outPat和inPath
4. 注意div的大小比例要和图片的大小比例差不多，不然图片会被拉伸变形
# 效果展示
https://1356151398.github.io/Kimetsu-no-Yaiba-Animation/html/test.html
