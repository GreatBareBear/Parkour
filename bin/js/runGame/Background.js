var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var Background = (function (_super) {
    __extends(Background, _super);
    function Background() {
        _super.call(this);
        // 图片的宽度
        this.BG_WIDTH = 1600;
        // 记录当前移动的值
        this.moveX = 0;
        // 定义北景1
        this.bg1 = null;
        // 定义北景2
        this.bg2 = null;
        // 地面
        this.grass = null;
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
    Background.prototype.onLoop = function () {
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
    };
    return Background;
}(Laya.Sprite));
//# sourceMappingURL=Background.js.map