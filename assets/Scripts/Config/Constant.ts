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
    public static readonly SFX_Attack_Popup = "Build_Meta_Attack_Popup_Result"
    public static readonly SFX_UI_Click = "UI_Button_Normal"
    public static readonly SFX_Attack_Lightning = "Build_Meta_Attack_Lightning";
    public static readonly SFX_Build = "Build_Meta_Tool"
    public static readonly SFX_Win = "Bonus_Win_2"
    public static readonly SFX_UI_Tab = "UI_Button_Tab"
    public static readonly LOADING_CLOUD = "LOADING_CLOUD"

    public static readonly SFX_BG1 = "bgMusic"
    public static readonly SFX_BG2 = "bgMusic_2"
}


