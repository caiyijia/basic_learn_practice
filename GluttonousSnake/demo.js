//点击开始游戏 = > startpage 消失 = > stagepage消失 = > 游戏开始
//随机出现食物，出现🐍开始运动
//上下左右 => 改变运动方向
// 判断吃到食物 => 食物消失，🐍长度+1
// 判断游戏结束，弹出框

var content = document.getElementById('content');
var startPage = document.getElementById('startPage');

init();

function init() {
    //地图
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height);
    this.mapDiv = content;

    // food
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;
    //snake
    this.snakeW = 20;
    this.snakeH = 20;
    this.snakeBody = [
        [3, 1, 'head'],
        [2, 1, 'body'],
        [1, 1, 'body']
    ]
    // game properties
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    startGame();
}


function startGame() {

    food();
    snake();
}

function food() {
    var food = document.createElement('div');
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    food.style.position = 'absolute';
    this.foodX = Math.floor(Math.random() * (this.mapW / 20));
    this.foodY = Math.floor(Math.random() * (this.mapH / 20));
    food.style.left = this.foodX * 20 + 'px';
    food.style.top = this.foodY * 20 + 'px';
    this.mapDiv.appendChild(food).setAttribute('class', 'food');

}

const snakeLen = this.snakeBody.length;

function snake() {
    for (var i = 0; i < snakeLen; i++) {
        var snake = document.createElement('div');
        snake.style.width = this.snakeW + 'px';
        snake.style.height = this.snakeH + 'px';
        snake.style.position = 'absolute';
        snake.style.left = this.snakeBody[i][0] * 20 + 'px';
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';
        snake.classList.add(this.snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');
    }
}

function move() {
    for (var i = 0; i < snakeLen, i++;) {
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    switch (this.direct) {
        case 'right':
            this.snakeBody[0][0] += 1;
            break;
        case 'up':
            this.snakeBody[0][1] -= 1;
            break;
        case 'left':
            this.snakeBody[0][0] -= 1;
            break;
        case 'down':
            this.snakeBody[0][0] += 1;
            break;
        default:
            break;

    }
    removeClass('snake');
    snake();
}

function removeClass(className) {
    var ele = document.getElementsByClassName(className);
    while (ele.length > 0) {
        ele[0].parentNode.removeChild(ele[0]);
    }
}

function setDirect(code) {
    swithch(code) {
        case 37:
            if (this.left) {
                this.direct = 'left';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
        case 38:
            if (this.up) {
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
        case 39:
            if (this.right) {
                this.direct = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
        case 40:
            if (this.down) {
                this.direct = 'left';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
        default:
        break;

    }
}

function bindEvent() {
    document.onkeydown = function (e) {
        var code = e.keyCode;
        setDirect(code);
    }
}