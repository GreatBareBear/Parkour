// 程序入口
class GameMain {
    private loading: Loading = null;
    private gameInfo: GameInfo = null;

    constructor() {
        Laya.init(852, 480, Laya.WebGL);
        Laya.Stat.show(0, 0);
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        RunGame.pause = true;

        // 预加载图片
        var resArray: Array<any> = [
            {
                url: [
                    "res/background.png",
                    "res/m_background.png",
                    "res/floor.png",
                    "res/item_1.png",
                    "res/item_2.png",
                    "res/item_3.png",
                    "res/item_4.png",
                    "res/bird_1.png",
                    "res/bird_2.png",
                    "res/bird_3.png",
                    "res/bird_4.png",
                    "res/effect.png",
                    "res/spiritEffect.png",
                    "res/en_bar.png",
                    "res/hp_bar.png",
                    "res/hp_bg.png"
                ],
                type: Laya.Loader.IMAGE
            },
            { url: "res/player.json", type: Laya.Loader.ATLAS }
        ];

        this.loading = new Loading();
        this.gameInfo = new GameInfo();
        this.gameInfo.once(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);

        Laya.stage.addChild(this.loading);
        Laya.loader.load(resArray, Laya.Handler.create(this, this.onLoaded), Laya.Handler.create(this, this.onLoading, null, false));
    }

    /**
     * 加载完成事件
     */
    private onLoaded(): void {
        Laya.stage.removeChild(this.loading);
        Laya.stage.addChild(this.gameInfo);
    }

    /**
     * 加载中事件
     */
    private onLoading(progress): void {
        this.loading.progress(progress);
    }

    private onMouseDown(): void {
        this.gameInfo.removeSelf();
        RunGame.pause = false;
        Laya.stage.addChild(new RunGame());
    }
}
new GameMain();
