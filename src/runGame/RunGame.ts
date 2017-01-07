/*
* name;
*/
class RunGame extends Laya.Sprite {
    public static pause: boolean = false;
    public static over: boolean = false;

    private mapFloor: MapFloor = null;
    private player: Player = null;
    private bg: Background = null;
    private flyEnergy: Hp = null;
    private speedEnergy: Hp = null;
    private scoreText: Laya.Text = null;
    private score: number = 0;
    // 道具碰撞检测坐标点
    private itemPoint: Laya.Point = new Laya.Point();
    private gameOver: GameOver = null;

    constructor() {
        super();
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
        this.scoreText.x = - 10;
        this.scoreText.y = 10;
        this.addChild(this.scoreText);

        this.gameOver = new GameOver();
        this.gameOver.visible = false;
        this.addChild(this.gameOver);

        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);

        Laya.timer.frameLoop(1, this, this.onLoop);
    }

    private onLoop(): void {
        // 检查人物是否踩在地板上面了
        for (var i = this.mapFloor.numChildren - 1; i > -1; i--) {
            var floor: Floor = this.mapFloor.getChildAt(i) as Floor;
            if (floor.checkHit(this.player.x, this.player.y)) {
                // 检测是否碰撞了
                var itemList: Array<Item> = floor.getItems();
                for (var j: number = 0; j < itemList.length; j++) {
                    var item: Item = itemList[j];
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
    }

    private itemTweenComplete(item: Item): void {
        item.visible = false;
        item.y = 0;
        item.alpha = 1;
        item.scale(1, 1);
    }
    private updateScore(): void {
        this.score++;
        this.scoreText.text = "" + this.score;
    }

    private playerDie(): void {
        RunGame.over = true;
        this.gameOver.setSocre(this.score);
        this.gameOver.visible = true;
    }
    private onMouseDown(): void {
        this.player.jump();
    }

    private onMouseUp(): void {
        this.player.gotoJump();
    }
}