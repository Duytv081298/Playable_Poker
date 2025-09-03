// ImportData.ts
import { _decorator, CCFloat, CCInteger, Color, Enum, Vec3 } from 'cc';


const { ccclass, property } = _decorator;

@ccclass('PathBoard')
export class PathBoard {
    @property(CCInteger)
    row: number = 0;

    @property(CCInteger)
    column: number = 0;
    constructor(row: number = 0, column: number = 0) {
        this.row = row;
        this.column = column;
    }

}


export class GameConfig {

    public static FLOWER_SPEED = 20;


    public static BOAT_SPEED = 2;
    public static TIME_ANIMATION_FLOWER_FULL_IN = 2;
    public static MAX_BALL_MOVE_HOLE = 32;
    public static SCALE_BALL_IN_BOX = new Vec3(0.9, 0.9, 0.9);
    public static SCALE_BALL_IN_SLOT = new Vec3(0.9, 0.9, 0.9);
    public static LAYER_TUTORIAL: number = 1 << 17;

    // public static MAX_BALL_MOVE_HOLE = 4;


}





export enum NameSound {
    Pop_1 = "Pop_1",
    Pop = "Pop",
    Win = "Win",
    Drop = "Drop",
    Wrong = "Wrong"
}
export enum OptionType {
    COW = 1,
    PIG = 2,
    CHICKEN = 3,
    STRAW = 4,
    RICE = 5,
}
