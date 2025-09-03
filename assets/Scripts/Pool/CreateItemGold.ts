import { _decorator, Node, Prefab, instantiate, Vec3, Tween, SpriteRenderer, SpriteFrame, Size } from 'cc';
import { Pool } from './Pool';
import { Singleton } from '../Base/Singleton';
import { CreateItemBase } from './CreateItemBase';
const { ccclass, property } = _decorator;

@ccclass('CreateItemGold')
export default class CreateItemGold extends CreateItemBase {
    public static instance(): CreateItemGold {
        return Singleton.getInstance.call(this);
    }

}
