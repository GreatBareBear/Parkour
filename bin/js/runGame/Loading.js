var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var Loading = (function (_super) {
    __extends(Loading, _super);
    function Loading() {
        _super.call(this);
        this.bg = null;
        this.txt = null;
        // 背景 
        this.bg = new Laya.Sprite();
        this.bg.graphics.drawRect(0, 0, 852, 480, "#000000");
        this.addChild(this.bg);
        // 文本
        this.txt = new Laya.Text();
        this.txt.color = "#FFFFFF";
        this.txt.fontSize = 30;
        this.txt.text = "Loading";
        this.txt.width = 852;
        this.txt.align = "center";
        this.txt.y = (480 - this.txt.height) * 0.5;
        this.addChild(this.txt);
    }
    Loading.prototype.progress = function (value) {
        this.txt.text = "Loading " + (value * 100) + "%";
    };
    return Loading;
}(Laya.Sprite));
//# sourceMappingURL=Loading.js.map