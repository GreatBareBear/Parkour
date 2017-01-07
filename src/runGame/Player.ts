/*
* name;
*/
class Player extends Laya.Sprite {
    private action: string = null;
    private spiritEffect: Laya.Sprite = null;
    private body: Laya.Animation = null;
    private bodyEffect1: Laya.Animation = null;
    private bodyEffect2: Laya.Animation = null;
    private jumpCount: number = 0;
    private jumpCountMax: number = 2;
    private vy: number = 0;
    private downSpeed: number = 3;
    private maxVy = 32;


    public static RUN: string = "PLAYER_RUN";
    public static FLY: string = "PLAYER_FLY";
    public static HERT: string = "PLAYER_HERT";
    public static JUMP: string = "PLAYER_JUMP";
    public static DIE: string = "PLAYER_DIE";
    public static cached: boolean = false;

    constructor() {
        super();
        this.width = 96;
        this.height = 96;
        if (!Player.cached) {
            Laya.Animation.createFrames(["player/chara_01.png", "player/chara_02.png", "player/chara_03.png", "player/chara_01.png"], Player.RUN);
            Laya.Animation.createFrames(["player/chara_05.png", "player/chara_06.png", "player/chara_07.png", "player/chara_08.png"], Player.FLY);
            Laya.Animation.createFrames(["player/chara_09.png", "player/chara_10.png", "player/chara_11.png", "player/chara_12.png"], Player.HERT);
            Laya.Animation.createFrames(["player/chara_13.png", "player/chara_14.png", "player/chara_16.png", "player/chara_16.png"], Player.JUMP);
        }
        if (this.spiritEffect == null) {
            var texture: Laya.Texture = Laya.loader.getRes("res/spiritEffect.png");
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

    private playAction(action: string): void {
        if (this.action == action) {
            return;
        }
        this.action = action;
        this.body.play(0, true, action);
        this.bodyEffect1.play(0, true, this.action);
        this.bodyEffect2.play(0, true, this.action);
    }

    private onLoop(): void {
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
    }

    public gotoJump(): void {
        this.playAction(Player.JUMP);
    }

    public gotoRun(): void {
        this.playAction(Player.RUN);
    }

    public gotoFly(): void {
        this.playAction(Player.FLY);
    }

    public jump(): void {
        if (this.jumpCount < this.jumpCountMax) {
            this.vy = -30;
            this.jumpCount++;
            this.gotoJump();
        } else {
            this.gotoFly();
        }
    }

    public jumpReset(): void {
        this.vy = 0;
        this.jumpCount = 0;
        this.gotoRun();
    }

    public isEffect(): boolean {
        return this.bodyEffect1.visible;
    }

    public showEffect(): void {
        RunGame.pause = true;
        this.spiritEffect.visible = true;
        Laya.Tween.to(this.spiritEffect, { scaleX: 0.1, scaleY: 0.1, rotation: 360 }, 1000, null, Laya.Handler.create(this, this.spiritEffectTweenComplete));
    }

    public hideEffect(): void {
        this.bodyEffect1.visible = false;
        this.bodyEffect2.visible = false;
    }

    private spiritEffectTweenComplete(): void {
        this.spiritEffect.visible = false;
        this.spiritEffect.scale(5, 5);
        this.bodyEffect1.visible = true;
        this.bodyEffect2.visible = true;
        RunGame.pause = false;
    }
}