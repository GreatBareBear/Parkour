/*
* name;
*/
class Background extends Laya.Sprite {
    // 图片的宽度
    private BG_WIDTH: number = 1600;
    // 记录当前移动的值
    private moveX: number = 0;
    // 定义北景1
    private bg1: Laya.Sprite = null;
    // 定义北景2
    private bg2: Laya.Sprite = null;
    // 地面
    private grass: Laya.Sprite = null;

    constructor() {
        super();
        var texture1 = Laya.loader.getRes("res/background.png");
        var texture2 = Laya.loader.getRes("res/m_background.png");

        this.bg1 = new Laya.Sprite();
        this.bg1.graphics.drawTexture(texture1, 0, 0);
        this.addChild(this.bg1);

        this.bg2 = new Laya.Sprite();
        this.bg2.graphics.drawTexture(texture1, 0, 0);
        this.addChild(this.bg2);
        this.bg2.pos(this.BG_WIDTH, 0);

        this.grass = new Laya.Sprite();
        this.grass.graphics.drawTexture(texture2, 0, 0);
        this.addChild(this.grass);

        // 创建帧循环
        Laya.timer.frameLoop(1, this, this.onLoop);
    }

    private onLoop(): void {
        if (RunGame.pause || RunGame.over) {
            return;
        }
        this.x -= 5;
        this.moveX = Math.abs(this.x);
        if (this.moveX - this.bg1.x >= this.BG_WIDTH) {
            this.bg1.x += this.BG_WIDTH * 2;
        }
        if (this.moveX - this.bg2.x >= this.BG_WIDTH) {
            this.bg2.x += this.BG_WIDTH * 2;
        }
        this.grass.x -= -5 * 0.5;
        if (this.grass.x + 960 < 0) {
            this.grass.x = this.moveX + 852;
        }
    }
}