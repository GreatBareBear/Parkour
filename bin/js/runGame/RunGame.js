var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var RunGame = (function (_super) {
    __extends(RunGame, _super);
    function RunGame() {
        _super.call(this);
        this.mapFloor = null;
        this.player = null;
        this.bg = null;
        this.flyEnergy = null;
        this.speedEnergy = null;
        this.scoreText = null;
        this.score = 0;
        // 道具碰撞检测坐标点
        this.itemPoint = new Laya.Point();
        this.gameOver = null;
        // 背景
        this.bg = new Background();
        this.addChild(this.bg);
        // 地板
        this.mapFloor = new MapFloor();
        this.addChild(this.mapFloor);
        // 飞行能量条
        this.flyEnergy = new Hp(Hp.HP_TYPE_ENERGY);
        this.flyEnergy.y = 7;
        this.addChild(this.flyEnergy);
        // 速度能量条
        this.speedEnergy = new Hp(Hp.HP_TYPE_SPEED);
        this.speedEnergy.y = 7;
        this.speedEnergy.x = this.flyEnergy.width + 10;
        this.addChild(this.speedEnergy);
        // 玩家
        this.player = new Player();
        this.player.x = 32 * 8;
        this.player.y = 32 * 4;
        this.player.on(Player.DIE, this, this.playerDie);
        this.addChild(this.player);
        // 分数
        this.scoreText = new Laya.Text();
        this.scoreText.color = "#FFFFFF";
        this.scoreText.fontSize = 30;
        this.scoreText.text = "0";
        this.scoreText.width = 852;
        this.scoreText.align = "right";
        this.scoreText.x = -10;
        this.scoreText.y = 10;
        this.addChild(this.scoreText);
        this.gameOver = new GameOver();
        this.gameOver.visible = false;
        this.addChild(this.gameOver);
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        Laya.timer.frameLoop(1, this, this.onLoop);
    }
    RunGame.prototype.onLoop = function () {
        // 检查人物是否踩在地板上面了
        for (var i = this.mapFloor.numChildren - 1; i > -1; i--) {
            var floor = this.mapFloor.getChildAt(i);
            if (floor.checkHit(this.player.x, this.player.y)) {
                // 检测是否碰撞了
                var itemList = floor.getItems();
                for (var j = 0; j < itemList.length; j++) {
                    var item = itemList[j];
                    if (!item.visible) {
                        continue;
                    }
                    this.itemPoint.x = item.x + floor.x + this.player.width;
                    this.itemPoint.y = item.y + floor.y + this.player.height;
                    console.log("item.x: " + this.itemPoint.x);
                    console.log("item.y: " + this.itemPoint.y);
                    console.log("player.x: " + this.player.x);
                    console.log("player.y: " + this.player.y);
                    // 碰撞
                    if (this.player.hitTestPoint(this.itemPoint.x, this.itemPoint.y)) {
                        console.log("in point=================" + item.type);
                        switch (item.type) {
                            case Item.ITEM_TYPE_SPEED:
                                item.visible = false;
                                this.player.showEffect();
                                break;
                            case Item.ITEM_TYPE_FLY:
                                item.visible = false;
                                break;
                            case Item.ITEM_TYPE_STAR:
                                Laya.Tween.to(item, { y: -10, scaleX: 0.1, alpha: 0 }, 300, null, Laya.Handler.create(this, this.itemTweenComplete, [item]));
                                this.updateScore();
                                break;
                            default:
                                ;
                        }
                    }
                }
                this.player.y = floor.y;
                this.player.jumpReset();
            }
        }
    };
    RunGame.prototype.itemTweenComplete = function (item) {
        item.visible = false;
        item.y = 0;
        item.alpha = 1;
        item.scale(1, 1);
    };
    RunGame.prototype.updateScore = function () {
        this.score++;
        this.scoreText.text = "" + this.score;
    };
    RunGame.prototype.playerDie = function () {
        RunGame.over = true;
        this.gameOver.setSocre(this.score);
        this.gameOver.visible = true;
    };
    RunGame.prototype.onMouseDown = function () {
        this.player.jump();
    };
    RunGame.prototype.onMouseUp = function () {
        this.player.gotoJump();
    };
    RunGame.pause = false;
    RunGame.over = false;
    return RunGame;
}(Laya.Sprite));
//# sourceMappingURL=RunGame.js.map