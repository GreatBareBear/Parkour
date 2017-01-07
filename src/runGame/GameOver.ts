/*
* name;
*/
class GameOver extends Laya.Sprite {
    private bg: Laya.Sprite = null;
    private txt: Laya.Text = null;

    constructor() {
        super();
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

    public setSocre(score: number) {
        var _score: string = Laya.LocalStorage.getItem("score");
        if (_score != null && parseInt(_score) > score) {
            score = parseInt(_score);
        }
        localStorage.setItem("score", "" + score);
        this.txt.text = "GameOver\n\n Click Again\n\n Best Score: " + score;
        this.txt.y = (852 - this.txt.height) * 0.5;
    }
}