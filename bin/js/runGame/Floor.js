var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var Floor = (function (_super) {
    __extends(Floor, _super);
    function Floor() {
        _super.call(this);
        this.bgTexture = null;
        this.bg = null;
        this.maxRight = 0;
        this.isOutComplete = false;
        this.rightBg = null;
        this.itemList = [];
    }
    Floor.prototype.init = function (type) {
        var needItem = true;
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
                var randomWidth = 32 * (3 + 19 * Math.random());
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
    };
    Floor.prototype.onLoop = function () {
        if (RunGame.pause || RunGame.over) {
            return;
        }
        this.x -= 5 * 1.2;
        if (!this.isOutComplete && (this.x + this.width < this.maxRight)) {
            this.isOutComplete = true;
            this.event(Floor.FLOOR_OUT_COMPLETE, this);
        }
        else if (this.x + this.width < 0) {
            Laya.timer.clear(this, this.onLoop);
            for (var i = 0; i < this.itemList.length; i++) {
                this.itemList[i].visible = false;
            }
            this.visible = false;
            this.event(Floor.FLOOR_OUT_DIE, this);
        }
    };
    Floor.prototype.addItem = function () {
        var m = 10 * Math.random();
        if (m < 5) {
            return;
        }
        var addNum = 0;
        var maxNum = this.width / 32;
        if (maxNum > 5) {
            addNum = 5 + (maxNum - 5) * Math.random();
        }
        else {
            addNum = maxNum;
        }
        var sx = (this.width - addNum * 32) * 0.5;
        var arr = [];
        var randNum;
        var specialItem = false;
        for (var i = 0; i < addNum; i++) {
            if (i % 2 == 0) {
                continue;
            }
            randNum = Math.random();
            var item = null;
            if (this.itemList.length > 0) {
                item = this.itemList.shift();
                item.visible = true;
            }
            else {
                item = Laya.Pool.getItemByClass("item", Item);
            }
            if (randNum > 0.95 && !specialItem) {
                specialItem = true;
                item.init(Item.ITEM_TYPE_SPEED);
            }
            else if (randNum > 0.9 && !specialItem) {
                specialItem = true;
                item.init(Item.ITEM_TYPE_FLY);
            }
            else {
                item.init(Item.ITEM_TYPE_STAR);
            }
            item.x = sx + i * 32;
            item.y = -30;
            this.addChild(item);
            arr.push(item);
        }
        // 存储当前所有ITEM
        this.itemList = [].concat(arr);
    };
    Floor.prototype.getItems = function () {
        return this.itemList;
    };
    Floor.prototype.checkHit = function (x, y) {
        if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height) {
            return true;
        }
        return false;
    };
    Floor.FLOOR_OUT_COMPLETE = "FLOOR_OUT_COMPLETE";
    Floor.FLOOR_OUT_DIE = "FLOOR_OUT_DIE";
    return Floor;
}(Laya.Sprite));
//# sourceMappingURL=Floor.js.map