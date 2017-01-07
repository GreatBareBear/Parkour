var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* name;
*/
var MapFloor = (function (_super) {
    __extends(MapFloor, _super);
    function MapFloor() {
        _super.call(this);
        this.dieFloorList = [];
        var floor = this.addFloor(1);
        floor.x = 0;
        Laya.timer.frameLoop(1, this, this.onLoop);
    }
    MapFloor.prototype.onLoop = function () {
        while (this.dieFloorList.length > 0) {
            var floor = this.dieFloorList.shift();
            floor.removeSelf();
            // 回收
            Laya.Pool.recover("floor", floor);
        }
    };
    MapFloor.prototype.addFloor = function (type) {
        var floor = Laya.Pool.getItemByClass("floor", Floor);
        floor.init(type);
        floor.once(Floor.FLOOR_OUT_COMPLETE, this, this.getFloor);
        floor.once(Floor.FLOOR_OUT_DIE, this, this.delFloor);
        this.addChild(floor);
        return floor;
    };
    MapFloor.prototype.getFloor = function (floor) {
        return this.addFloor(2);
    };
    MapFloor.prototype.delFloor = function (floor) {
        this.dieFloorList.push(floor);
    };
    return MapFloor;
}(Laya.Sprite));
//# sourceMappingURL=MapFloor.js.map