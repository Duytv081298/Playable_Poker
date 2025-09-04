import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Constant')
export class Constant {
    public static SFX_WIN = 'Bonus_Win';
    public static SFX_CARD_FLIP = 'Card_Flip';
    public static SFX_MONEY = 'Earn_Reward_Money';
    public static SFX_CHECK = 'Table_Check';
    public static SFX_ALL_IN = 'Table_Chip_All_In';
    public static SFX_BET = 'Table_Chip_Bet_04';
}


