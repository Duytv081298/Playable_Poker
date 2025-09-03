import { _decorator } from 'cc';
import BaseEvent from './BaseEvent';
const { ccclass, property } = _decorator;

@ccclass('GlobalEvent')
export class GlobalEvent extends BaseEvent {
    private static event: GlobalEvent | null = null;

    // Đảm bảo rằng constructor là private để ngăn tạo thể hiện bên ngoài
    private constructor() {
        super();
    }

    public static instance(): GlobalEvent {
        if (!GlobalEvent.event) {
            GlobalEvent.event = new GlobalEvent();
        }
        return GlobalEvent.event;
    }

    // Các chuỗi sự kiện
    static readonly START_GAME = "GlobalEvent.START_GAME";
    static readonly SHOW_LOSE = "GlobalEvent.SHOW_LOSE";
    static readonly SHOW_WIN = "GlobalEvent.SHOW_WIN";
    static readonly OPEN_STORE = "GlobalEvent.OPEN_STORE";
    static readonly ACTIVE_AUTO_OPEN_STORE = "GlobalEvent.ACTIVE_AUTO_OPEN_STORE";


    static readonly SHOW_TUTORIAL = "GlobalEvent.SHOW_TUTORIAL";
    static readonly CLEAR_TUTORIAL = "GlobalEvent.CLEAR_TUTORIAL";


    static readonly DESTROY_BLOCK = "GlobalEvent.DESTROY_BLOCK";




    static readonly START_TIMER = "GlobalEvent.START_TIMER";
    static readonly STOP_TIMER = "GlobalEvent.STOP_TIMER";


    static readonly WINDOW_RESIZE = "window-resize";
    static readonly ORIENTATION_CHANGE = "orientation-change";
    static readonly FULLSCREEN_CHANGE = "fullscreen-change";
    static readonly ADD_GOLD = "ADD_GOLD";
    static readonly SUBTRACT_GOLD = "SUBTRACT_GOLD";
    static readonly NEXT_STAGE = "NEXT_STAGE";


    static readonly START_GAME_MOVE_BOAT = "START_GAME_MOVE_BOAT";

    static readonly REMOVE_OPTION = "REMOVE_OPTION";
    static readonly SHOW_NEXT_OPTION = "SHOW_NEXT_OPTION";
    static readonly HIDE_OPTION = "HIDE_OPTION";
    static readonly UPDATE_CHIP = "UPDATE_CHIP";
    static readonly DOWN_CHIP = "DOWN_CHIP";




}
