//点击开始游戏 => 动态生成100个小格子 => div*100
//leftClick 没有雷 => 显示数字（代表以当前格子为中心周围8个格的雷数） 扩散（当前周围八个格没有雷）
// 有雷 => game over
//rightClick 没有标记并且没有数字 => 进行标记。 有标记=> 取消标记 => 标记是否正确，10个都正确标记，提示成功
// 已经出现数字 => 无效果

var startBtn = document.getElementById('btn');
var box = document.getElementById('box');
var flagBox = document.getElementById('flagBox');
var alertBox = document.getElementById('alertBox');
var alertImg = document.getElementById('alertImg');
var closeBtn = document.getElementById('close');
var score = document.getElementById('score');
var minesNum;
var mineOver;
var realNum;
var block;
var mineMap; //必须为数组!!!
var startGameBool = true;


bindEvent();

function bindEvent() {
    startBtn.onclick = function () {
        if (startGameBool) {
            box.style.display = 'block';
            flagBox.style.display = 'block';
            startGameBool = false;
            init();
        }

    }
    box.oncontextmenu = function () {
        return false;
    }
    box.onmousedown = function (e) {
        var event = e.target;
        if (e.which == 1) {
            leftClick(event);
        } else if (e.which == 3) {
            rightClick(event);
        }
    }
    closeBtn.onclick = function () {
        alertBox.style.display = 'none';
        flagBox.style.display = 'none';
        box.style.display = 'none';
        box.innerHTML = '';
        startGameBool = true;
    }
}

function init() {

    minesNum = 20; //需要生成的雷数
    mineOver = 20; //显示的剩余雷数
    realNum = 20; //真实的雷数
    mineMap = []; //雷的位置
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var con = document.createElement('div');
            con.classList.add('block');
            con.setAttribute('id', i + '-' + j);
            box.appendChild(con);
            mineMap.push({
                mine: 0
            }); // mineMap先被创建为array才能被push！
        }
    }
    block = document.getElementsByClassName('block');
    while (minesNum) {
        var mineIndex = Math.floor(Math.random() * 100)
        if (mineMap[mineIndex].mine === 0) {
            mineMap[mineIndex].mine = 1;
            block[mineIndex].classList.add('isLei');
            minesNum--;
        }
        // block[mineIndex].classList.add('isLei');
    }


}

function leftClick(dom) {
    if (dom.classList.contains('flag')) {
        return;
    }
    var isLei = document.getElementsByClassName('isLei');
    if (dom && dom.classList.contains('isLei')) {
        console.log('gameOver');

        for (var i = 0; i < isLei.length; i++) {
            isLei[i].classList.add('show');
        }
        setTimeout(function () {
            alertBox.style.display = 'block';
            alertImg.style.backgroundImage = 'url("imgs/over.jpg")'
        }, 800)
    } else {
        var n = 0;
        var posArr = dom && dom.getAttribute('id').split('-');
        var posX = posArr && +posArr[0];
        var posY = posArr && +posArr[1];
        dom && dom.classList.add('num');
        for (var i = posX - 1; i <= posX + 1; i++) {
            for (var j = posY - 1; j <= posY + 1; j++) {
                var aroundBox = document.getElementById(i + '-' + j);
                if (aroundBox && aroundBox.classList.contains('isLei')) {
                    n++;
                }
            }

        }
        dom && (dom.innerHTML = n);
        if (n == 0) {
            for (var i = posX - 1; i <= posY + 1; i++) {
                // i-1,j-1  i-1,j   i-1,j+1
                // i,j-1    i,j     i,j+1
                // i+1,j-1  i+1,j   i+1,j+1
                for (var j = posY - 1; j <= posY + 1; j++) {
                    var nearBox = document.getElementById(i + '-' + j);
                    if (nearBox) {
                        if (!nearBox.classList.contains('num') && !nearBox.classList.contains('isLei')) { 
                        // nearBox.classList.add('check');
                        leftClick(nearBox);
                        }

                    }
                }
            }
        }

    }
}

function rightClick(dom) {
    if (dom.classList.contains('num')) {
        return;
    }
    dom.classList.toggle('flag');
    if (dom.classList.contains('flag')) {
        mineOver--;
        if (dom.classList.contains('isLei')) {
            realNum--;
        }
    }
    if (!dom.classList.contains('flag')) {
        mineOver++;
        if (dom.classList.contains('isLei')) {
            realNum++;
        }
    }

    score.innerHTML = mineOver;
    if (realNum == 0) {
        alertBox.style.display = 'block';
        alertImg.style.backgroundImage = 'url("imgs/success.png")'
        alertBox.oncontextmenu = function () {
            return false;
        }
    }
}