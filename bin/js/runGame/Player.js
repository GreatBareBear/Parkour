var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        _super.call(this);
        this.action = null;
        this.spiritEffect = null;
        this.body = null;
        this.bodyEffect1 = null;
        this.bodyEffect2 = null;
        this.jumpCount = 0;
        this.jumpCountMax = 2;
        this.vy = 0;
        this.downSpeed = 3;
        this.maxVy = 32;
        this.width = 96;
        this.height = 96;
        if (!Player.cached) {
            Laya.Animation.createFrames(["player/chara_01.png", "player/chara_02.png", "player/chara_03.png", "player/chara_01.png"], Player.RUN);
            Laya.Animation.createFrames(["player/chara_05.png", "player/chara_06.png", "player/chara_07.png", "player/chara_08.png"], Player.FLY);
            Laya.Animation.createFrames(["player/chara_09.png", "player/chara_10.png", "player/chara_11.png", "player/chara_12.png"], Player.HERT);
            Laya.Animation.createFrames(["player/chara_13.png", "player/chara_14.png", "player/chara_16.png", "player/chara_16.png"], Player.JUMP);
        }
        if (this.spiritEffect == null) {
            var texture = Laya.loader.getRes("res/spiritEffect.png");
            this.spiritEffect = new Laya.Sprite();
            this.spiritEffect.pivot(154 * 0.5, 190 * 0.5);
            this.spiritEffect.visible = false;
            this.spiritEffect.scale(5, 5);
            this.spiritEffect.graphics.drawTexture(texture, 0, 0, 154, 190);
            this.addChild(this.spiritEffect);
        }
        if (this.body == null) {
            this.body = new Laya.Animation();
            this.body.pivot(48, 60);
            this.body.interval = 100;
            this.addChild(this.body);
        }
        if (this.bodyEffect1 == null) {
            this.bodyEffect1 = new Laya.Animation();
            this.bodyEffect1.alpha = 0.6;
            this.bodyEffect1.pivot(80, 60);
            this.bodyEffect1.interval = 100;
            this.bodyEffect1.visible = false;
            this.addChild(this.bodyEffect1);
        }
        if (this.bodyEffect2 == null) {
            this.bodyEffect2 = new Laya.Animation();
            this.bodyEffect2.alpha = 0.3;
            this.bodyEffect2.pivot(110, 60);
            this.bodyEffect2.interval = 100;
            this.bodyEffect2.visible = false;
            this.addChild(this.bodyEffect2);
        }
        this.playAction(Player.RUN);
        Laya.timer.frameLoop(1, this, this.onLoop);
    }
    Player.prototype.playAction = function (action) {
        if (this.action == action) {
            return;
        }
        this.action = action;
        this.body.play(0, true, action);
        this.bodyEffect1.play(0, true, this.action);
        this.bodyEffect2.play(0, true, this.action);
    };
    Player.prototype.onLoop = function () {
        this.y += this.vy;
        this.vy += this.downSpeed;
        if (this.isEffect()) {
            this.hideEffect();
        }
        if (this.vy > this.maxVy) {
            this.vy = this.maxVy;
        }
        if (this.y > (480 + 100)) {
            this.event(Player.DIE, this);
            return;
        }
        switch (this.action) {
            case Player.FLY:
                this.vy = 0;
                this.y -= 4;
                if (this.y < 110) {
                    this.y = 110;
                }
                break;
            case Player.HERT:
                break;
            default:
                break;
        }
    };
    Player.prototype.gotoJump = function () {
        this.playAction(Player.JUMP);
    };
    Player.prototype.gotoRun = function () {
        this.playAction(Player.RUN);
    };
    Player.prototype.gotoFly = function () {
        this.playAction(Player.FLY);
    };
    Player.prototype.jump = function () {
        if (this.jumpCount < this.jumpCountMax) {
            this.vy = -30;
            this.jumpCount++;
            this.gotoJump();
        }
        else {
            this.gotoFly();
        }
    };
    Player.prototype.jumpReset = function () {
        this.vy = 0;
        this.jumpCount = 0;
        this.gotoRun();
    };
    Player.prototype.isEffect = function () {
        return this.bodyEffect1.visible;
    };
    Player.prototype.showEffect = function () {
        RunGame.pause = true;
        this.spiritEffect.visible = true;
        Laya.Tween.to(this.spiritEffect, { scaleX: 0.1, scaleY: 0.1, rotation: 360 }, 1000, null, Laya.Handler.create(this, this.spiritEffectTweenComplete));
    };
    Player.prototype.hideEffect = function () {
        this.bodyEffect1.visible = false;
        this.bodyEffect2.visible = false;
    };
    Player.prototype.spiritEffectTweenComplete = function () {
        this.spiritEffect.visible = false;
        this.spiritEffect.scale(5, 5);
        this.bodyEffect1.visible = true;
        this.bodyEffect2.visible = true;
        RunGame.pause = false;
    };
    Player.RUN = "PLAYER_RUN";
    Player.FLY = "PLAYER_FLY";
    Player.HERT = "PLAYER_HERT";
    Player.JUMP = "PLAYER_JUMP";
    Player.DIE = "PLAYER_DIE";
    Player.cached = false;
    return Player;
}(Laya.Sprite));
//# sourceMappingURL=Player.js.map