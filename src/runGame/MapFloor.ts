/*
* name;
*/
class MapFloor extends Laya.Sprite {
    private dieFloorList: Array<Floor> = [];

    constructor() {
        super();
        var floor = this.addFloor(1);
        floor.x = 0;
        Laya.timer.frameLoop(1, this, this.onLoop);
    }

    private onLoop(): void {
        while (this.dieFloorList.length > 0) {
            var floor: Floor = this.dieFloorList.shift();
            floor.removeSelf();
            // 回收
            Laya.Pool.recover("floor", floor);
        }
    }

    private addFloor(type: number): Floor {
        let floor: Floor = Laya.Pool.getItemByClass("floor", Floor);
        floor.init(type);
        floor.once(Floor.FLOOR_OUT_COMPLETE, this, this.getFloor);
        floor.once(Floor.FLOOR_OUT_DIE, this, this.delFloor);
        this.addChild(floor);
        return floor;
    }

    private getFloor(floor): Floor {
        return this.addFloor(2);
    }

    private delFloor(floor: Floor): void {
        this.dieFloorList.push(floor);
    }
}
