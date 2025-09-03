import { macro } from "cc";
import { Utils } from "../Config/Utils";


export default class MainData {
    private static mainData: MainData | null = null;

    public static instance(): MainData {
        if (!MainData.mainData) {
            MainData.mainData = new MainData();
        }
        return MainData.mainData;
    }

    orientation: number = macro.ORIENTATION_PORTRAIT;
    isPlaySound = true;
    constructor() {
    }
}
