/*
* name;
*/
class Hp extends Laya.Sprite {
    private bg: Laya.Sprite = null;
    private bar: Laya.Sprite = null;
    private MIN_VALUE = 0;
    private MAX_VALUE = 100;
    private value = 100;
    public static HP_TYPE_ENERGY: string = "HP_TYPE_ENERGY";
    public static HP_TYPE_SPEED: string = "HP_TYPE_SPEED";

    constructor(type: string) {
        super();
        this.width = 180;
        this.height = 21;
        var texture1: Laya.Texture = Laya.loader.getRes("res/hp_bg.png");
        var texture2: Laya.Texture;
        switch (type) {
            case Hp.HP_TYPE_ENERGY:
                texture2 = Laya.loader.getRes("res/en_bar.png");
                break;
            case Hp.HP_TYPE_SPEED:
                texture2 = Laya.loader.getRes("res/hp_bar.png");
                break;
            default:
                ;
        }
        this.bg = new Laya.Sprite();
        this.bar = new Laya.Sprite();
        this.bar.x = 15;
        this.bar.y = 2;

        this.bg.graphics.drawTexture(texture1, 0, 0, 180, 21);
        this.bar.graphics.drawTexture(texture2, 0, 0, 155, 12);

        this.addChild(this.bg);
        this.addChild(this.bar);
    }

    public changeValue(value: number): void {
        this.value += value;
        if (this.value < this.MIN_VALUE) {
            this.value = this.MIN_VALUE;
        } else if (this.value > this.MAX_VALUE) {
            this.value = this.MAX_VALUE;
        }
        this.bar.scale(this.value / this.MAX_VALUE, 1);
    }
}