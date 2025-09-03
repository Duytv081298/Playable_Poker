import { Camera, Component, Node, Size, _decorator, macro, screen } from "cc";
import { GlobalEvent } from "./event/GlobalEvent";
import MainData from "./MainData";
const { ccclass, property } = _decorator;

@ccclass
export default class Responsive extends Component {
    @property(Camera)
    cameras: Camera[] = [];

    device: string = "";
    isRotate: boolean = false;

    HORIZONTAL_IPX: string = "horizontal_IPX";
    HORIZONTAL_TABLET: string = "horizontal_Tablet";
    VERTICAL_IPX: string = "vertical_IPX";
    VERTICAL_MOBILE: string = "vertical_Mobile";

    protected onLoad(): void {
        this.handleRotate();
        screen.on(GlobalEvent.WINDOW_RESIZE, this.onWindowResize, this);
        screen.on(GlobalEvent.ORIENTATION_CHANGE, this.onOrientationChange, this);
        screen.on(GlobalEvent.FULLSCREEN_CHANGE, this.onFullScreenChange, this);
    }


    onDestroy() {
        screen.off(GlobalEvent.WINDOW_RESIZE, this.onWindowResize, this);
        screen.off(GlobalEvent.ORIENTATION_CHANGE, this.onOrientationChange, this);
        screen.off(GlobalEvent.FULLSCREEN_CHANGE, this.onFullScreenChange, this);
    }

    onWindowResize(width: number, height: number) {
        this.handleRotate();
        this.initOrientation();
    }
    onOrientationChange(orientation: number) {
        this.handleRotate();
        this.initOrientation();
    }
    onFullScreenChange(width: number, height: number) {
        let screenSize: Size = new Size(width, height)
        this.handleRotate();
        this.initOrientation();
    }
    protected start(): void {
        this.handleRotate();
        this.initOrientation();
    }

    private handleRotate(): void {
        if (screen.windowSize.width > screen.windowSize.height) {
            this.isRotate = true;
            this.setHorizontal();
        } else {
            this.isRotate = false;
            this.setVertical();
        }
    }


    private setHorizontal(): void {
        if (screen.windowSize.height / screen.windowSize.width < 0.65) {
            this.setHorizontalForIpX();
        } else {
            this.setHorizontalForTablet();
        }
    }

    private setHorizontalForIpX(): void {
        if (this.HORIZONTAL_IPX === this.device) return;
      //  console.log("hr ipx");
        this.device = this.HORIZONTAL_IPX;
        this.changeDataCamera(32);
    }

    private setHorizontalForTablet(): void {
        if (this.HORIZONTAL_TABLET === this.device) return;
        this.device = this.HORIZONTAL_TABLET;
      //  console.log("HorizontalForTablet");
            this.changeDataCamera(35);

    }

    private setVertical(): void {
        if (screen.windowSize.width / screen.windowSize.height < 0.5) {
            this.setIphoneX();
        } else {
            this.setMobile();
        }
    }

    private setIphoneX(): void {
        if (this.VERTICAL_IPX === this.device) return;
      //  console.log("vt ipx");
        this.device = this.VERTICAL_IPX;
        this.changeDataCamera(42);
    }

    private setMobile(): void {
        if (this.VERTICAL_MOBILE === this.device) return;
        this.device = this.VERTICAL_MOBILE;
        if (screen.windowSize.width / screen.windowSize.height < 0.7) {
          //  console.log("vt ip 6");
            this.changeDataCamera(33);
        } else {
          //  console.log("vt ipad");
            this.changeDataCamera(35);
        }
    }

    changeDataCamera(orthoHeight: number) {
        for (let i = 0; i < this.cameras.length; i++) {
            this.cameras[i].orthoHeight = orthoHeight;
          //  console.log("orthoHeight: " + orthoHeight);
        }
    }

    initOrientation() {
        let orientation = this.getCurrentOrientation();
        MainData.instance().orientation = orientation;
        GlobalEvent.instance().dispatchEvent(GlobalEvent.ORIENTATION_CHANGE, orientation);
    }

    getCurrentOrientation(): number {
        const { width, height } = screen.windowSize;
        const ratio = width / height;
      //  console.log("ratio: " + ratio);
        

        return ratio < 1.54 ? macro.ORIENTATION_PORTRAIT : macro.ORIENTATION_LANDSCAPE;
    }
}
