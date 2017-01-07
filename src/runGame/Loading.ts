/*
* name;
*/
class Loading extends Laya.Sprite {
    private bg: Laya.Sprite = null;
    private txt: Laya.Text = null;

    constructor() {
        super();
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

    public progress(value: number): void {
        this.txt.text = "Loading " + (value * 100) + "%";
    }
}
