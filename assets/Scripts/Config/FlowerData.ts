import { _decorator, CCBoolean, Component, Enum, Vec3 } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('FlowerData')
export class FlowerData {
    @property(CCBoolean)
    available: boolean = true;


    @property(Vec3)
    rotation: Vec3 = new Vec3()

    @property(Vec3)
    position: Vec3 = new Vec3()

}