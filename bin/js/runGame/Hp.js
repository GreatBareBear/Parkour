var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var Hp = (function (_super) {
    __extends(Hp, _super);
    function Hp(type) {
        _super.call(this);
        this.bg = null;
        this.bar = null;
        this.MIN_VALUE = 0;
        this.MAX_VALUE = 100;
        this.value = 100;
        this.width = 180;
        this.height = 21;
        var texture1 = Laya.loader.getRes("res/hp_bg.png");
        var texture2;
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
    Hp.prototype.changeValue = function (value) {
        this.value += value;
        if (this.value < this.MIN_VALUE) {
            this.value = this.MIN_VALUE;
        }
        else if (this.value > this.MAX_VALUE) {
            this.value = this.MAX_VALUE;
        }
        this.bar.scale(this.value / this.MAX_VALUE, 1);
    };
    Hp.HP_TYPE_ENERGY = "HP_TYPE_ENERGY";
    Hp.HP_TYPE_SPEED = "HP_TYPE_SPEED";
    return Hp;
}(Laya.Sprite));
//# sourceMappingURL=Hp.js.map