/*
* name;
*/
class Floor extends Laya.Sprite {
    private bgTexture: Laya.Texture = null;
    private bg: Laya.Sprite = null;
    private maxRight: number = 0;
    private isOutComplete: boolean = false;
    private rightBg: Laya.Sprite = null;
    private itemList: Array<Item> = [];

    public static FLOOR_OUT_COMPLETE: string = "FLOOR_OUT_COMPLETE";
    public static FLOOR_OUT_DIE: string = "FLOOR_OUT_DIE";

    constructor() {
        super();
    }

    public init(type: number): void {
        var needItem: boolean = true;
        this.visible = true;
        this.isOutComplete = false;
        this.maxRight = 0;
        this.autoSize = true;
        this.x = 852;
        this.y = 32 * 6 + 32 * 8 * Math.random();
        if (this.bg == null) {
            this.bgTexture = Laya.loader.getRes("res/floor.png");
            this.bg = new Laya.Sprite();
            this.bg.graphics.clear();
            this.addChild(this.bg);

            this.rightBg = new Laya.Sprite();
            this.rightBg.graphics.drawTexture(Laya.Texture.createFromTexture(this.bgTexture, 32 * 29, 0, 32, 96), 0, 0, 32, 96);
            this.rightBg.width = 32;
            this.addChild(this.rightBg);
        }

        switch (type) {
            case 1:
                this.rightBg.visible = false;
                this.bg.graphics.drawTexture(this.bgTexture, 0, 0, 960, 96);
                needItem = false;
                break;
            default:
                let randomWidth = 32 * (3 + 19 * Math.random());
                this.bg.graphics.clear();
                this.bg.graphics.drawTexture(Laya.Texture.createFromTexture(this.bgTexture, 0, 0, randomWidth, 96), 0, 0, randomWidth, 96);
                this.rightBg.visible = true;
                this.rightBg.x = randomWidth;
        }
        this.maxRight = 852 - 32 * 2 - 32 * 10 * Math.random();
        if (needItem) {
            this.addItem();
        }

        Laya.timer.frameLoop(1, this, this.onLoop);
    }

    private onLoop(): void {
        if (RunGame.pause || RunGame.over) {
            return;
        }
        this.x -= 5 * 1.2;
        if (!this.isOutComplete && (this.x + this.width < this.maxRight)) {
            this.isOutComplete = true;
            this.event(Floor.FLOOR_OUT_COMPLETE, this);
        } else if (this.x + this.width < 0) {
            Laya.timer.clear(this, this.onLoop);
            for (var i: number = 0; i < this.itemList.length; i++) {
                this.itemList[i].visible = false;
            }
            this.visible = false;
            this.event(Floor.FLOOR_OUT_DIE, this);
        }
    }

    private addItem(): void {
        var m: number = 10 * Math.random();
        if (m < 5) {
            return;
        }
        var addNum: number = 0;
        var maxNum: number = this.width / 32;
        if (maxNum > 5) {
            addNum = 5 + (maxNum - 5) * Math.random();
        } else {
            addNum = maxNum;
        }
        var sx: number = (this.width - addNum * 32) * 0.5;
        var arr: Array<Item> = [];
        var randNum: number;
        var specialItem: boolean = false;
        for (var i: number = 0; i < addNum; i++) {
            if (i % 2 == 0) {
                continue;
            }
            randNum = Math.random();
            var item: Item = null;
            if (this.itemList.length > 0) {
                item = this.itemList.shift();
                item.visible = true;
            } else {
                item = Laya.Pool.getItemByClass("item", Item);
            }
            if (randNum > 0.95 && !specialItem) {
                specialItem = true;
                item.init(Item.ITEM_TYPE_SPEED);
            } else if (randNum > 0.9 && !specialItem) {
                specialItem = true;
                item.init(Item.ITEM_TYPE_FLY);
            } else {
                item.init(Item.ITEM_TYPE_STAR);
            }
            item.x = sx + i * 32;
            item.y = -30;
            this.addChild(item);
            arr.push(item);
        }
        // 存储当前所有ITEM
        this.itemList = [].concat(arr);
    }

    public getItems(): Array<Item> {
        return this.itemList;
    }

    public checkHit(x: number, y: number): boolean {
        if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height) {
            return true;
        }
        return false;
    }
}
