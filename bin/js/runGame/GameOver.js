var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        _super.call(this);
        this.bg = null;
        this.txt = null;
        this.width = 852;
        this.height = 480;
        // 背景
        this.bg = new Laya.Sprite();
        this.bg.alpha = 0.8;
        this.bg.graphics.drawRect(0, 0, 852, 480, "#000000");
        this.addChild(this.bg);
        // 文本
        this.txt = new Laya.Text();
        this.txt.color = "#FFFFFF";
        this.txt.fontSize = 20;
        this.txt.text = "GameOver\n\n Click Again";
        this.txt.width = 852;
        this.txt.align = "center";
        this.txt.y = (852 - this.txt.height) * 0.5;
        this.addChild(this.txt);
    }
    GameOver.prototype.setSocre = function (score) {
        var _score = Laya.LocalStorage.getItem("score");
        if (_score != null && parseInt(_score) > score) {
            score = parseInt(_score);
        }
        localStorage.setItem("score", "" + score);
        this.txt.text = "GameOver\n\n Click Again\n\n Best Score: " + score;
        this.txt.y = (852 - this.txt.height) * 0.5;
    };
    return GameOver;
}(Laya.Sprite));
//# sourceMappingURL=GameOver.js.map