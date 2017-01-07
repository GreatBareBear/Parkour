var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var Item = (function (_super) {
    __extends(Item, _super);
    function Item() {
        _super.call(this);
        // 图标
        this.icon = null;
        // 星星贴图
        this.starTexture = null;
        // 加速贴图
        this.speedTexture = null;
        // 悬空贴图
        this.flyTexture = null;
        // 类型
        this.type = "";
        if (this.icon == null) {
            this.starTexture = Laya.loader.getRes("res/item_1.png");
            this.speedTexture = Laya.loader.getRes("res/item_3.png");
            this.flyTexture = Laya.loader.getRes("res/item_4.png");
            this.icon = new Laya.Sprite();
            this.addChild(this.icon);
        }
    }
    Item.prototype.init = function (type) {
        this.type = type;
        this.icon.graphics.clear();
        switch (type) {
            case Item.ITEM_TYPE_STAR:
                this.icon.graphics.drawTexture(this.starTexture, 0, 0, 32, 32);
                break;
            case Item.ITEM_TYPE_SPEED:
                this.icon.graphics.drawTexture(this.speedTexture, 0, 0, 32, 32);
                break;
            case Item.ITEM_TYPE_FLY:
                this.icon.graphics.drawTexture(this.flyTexture, 0, 0, 32, 32);
                break;
            default:
                ;
        }
    };
    // 星星
    Item.ITEM_TYPE_STAR = "item_type_star";
    // 加速
    Item.ITEM_TYPE_SPEED = "item_type_speed";
    // 悬空
    Item.ITEM_TYPE_FLY = "item_type_fly";
    return Item;
}(Laya.Sprite));
//# sourceMappingURL=Item.js.map