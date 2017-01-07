/*
* name;
*/
class Item extends Laya.Sprite {
    // 图标
    private icon: Laya.Sprite = null;
    // 星星贴图
    private starTexture: Laya.Texture = null;
    // 加速贴图
    private speedTexture: Laya.Texture = null;
    // 悬空贴图
    private flyTexture: Laya.Texture = null;
    // 类型
    public type: string = "";
    // 星星
    public static ITEM_TYPE_STAR = "item_type_star";
    // 加速
    public static ITEM_TYPE_SPEED = "item_type_speed";
    // 悬空
    public static ITEM_TYPE_FLY = "item_type_fly";

    constructor() {
        super();
        if (this.icon == null) {
            this.starTexture = Laya.loader.getRes("res/item_1.png");
            this.speedTexture = Laya.loader.getRes("res/item_3.png");
            this.flyTexture = Laya.loader.getRes("res/item_4.png");
            this.icon = new Laya.Sprite();
            this.addChild(this.icon);
        }
    }

    public init(type: string): void {
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
    }
}