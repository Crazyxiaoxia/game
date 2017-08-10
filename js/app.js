// 这是我们的玩家要躲避的敌人
var rowHeight = 83;
var colwidth = 101;

var Enemy = function (x, y, speed, sprite) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = sprite;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function (dt) {
    this.x += dt * this.speed;// 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    if (this.x > colwidth * 5) {
        this.x = randomPositionRow();
        this.speed = randomSpeed();
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
var player = function (x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}
player.prototype.playerReset = function () {
    this.x = colwidth * 2;
    this.y = rowHeight * 4;
}
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
player.prototype.update = function (dt) {
     var current = this;
    allEnemies.forEach(function (element) {
         if (current.y == element.y) {
            if (current.x - colwidth < element.x && element.x < current.x + colwidth) {
                alert("Sorry, you failed!")
                current.playerReset();
                return;
            }
        }
    })

     if (current.y == 0) {
        alert("Congratulations, you win");
        current.playerReset();
    }
}

player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

player.prototype.handleInput = function (code) {
    switch (code){
        case 'left':
         if (this.x >= colwidth) {
            this.x-=colwidth;
        }
            break;
        case 'up':
         if (this.y >= rowHeight) {
            this.y-=rowHeight;
        }
            break;
        case 'right':
          if (this.x <= colwidth*3) {
            this.x+=colwidth;
        }
            break;
        case 'down':
        if (this.y <= rowHeight*4) {
            this.y+=rowHeight;
        }
            break;
    }

}

// 现在实例化你的所有对象
var enemy1=new Enemy(randomPositionRow(),rowHeight,randomSpeed(),"images/enemy-bug.png");
var enemy2=new Enemy(randomPositionRow(),rowHeight*2,randomSpeed(),"images/enemy-bug.png");
var enemy3=new Enemy(randomPositionRow(),rowHeight*3,randomSpeed(),"images/enemy-bug.png");
var play1=new player(colwidth*2,rowHeight*4,"images/char-boy.png");
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var allEnemies=[];
allEnemies.push(enemy1,enemy2,enemy3);
// 把玩家对象放进一个叫 player 的变量里面
var player=play1;

//敌人随机位置
function randomPositionRow(){
    return Math.floor(Math.random()*(colwidth*2)-colwidth*5); //有问题???????
}
function randomSpeed(){
    return Math.floor(Math.random()*(colwidth*3)+colwidth/2);//有问题???????
}

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
