import { _decorator, Component, Button, macro, BlockInputEvents, EventHandler } from 'cc';
import { GlobalEvent } from './event/GlobalEvent';
import MainData from './MainData';
import { SoundManager } from './SoundManager';
import super_html_playable from './super_html/super_html/super_html_playable';

const { ccclass, property, executionOrder } = _decorator;
const androidUrl = "https://play.google.com/store/apps/details?id=com.bagelcode.upg";
const iosUrl = "https://play.google.com/store/apps/details?id=com.bagelcode.upg";

@ccclass('PlayableAdsController')
@executionOrder(0)
export default class PlayableAdsController extends Component {
    @property
    private isBuild: boolean = true;
    @property
    private isClearLog: boolean = true;
    private button: Button = null;
    isActiveAutoStore: boolean = false;
    channel: string = ''

    onLoad() {
        // console.log("Create by Duy");
        // console.log("Email: duytv0812@gmail.com");
        this.channel = this.getChannel();

        (window as any).ironSourceSoundState = true;
        MainData.instance().isPlaySound = true;
        macro.ENABLE_MULTI_TOUCH = false;
        macro.ENABLE_TRANSPARENT_CANVAS = true;

        if (this.isClearLog) console.log = () => { };
        this.addButton();
        (window as any).gameReady && (window as any).gameReady();


        super_html_playable.set_google_play_url(androidUrl);
        super_html_playable.set_app_store_url(iosUrl);



    }

    protected onEnable(): void {
        GlobalEvent.instance().addEventListener(GlobalEvent.OPEN_STORE, this.openStore, this);
        GlobalEvent.instance().addEventListener(GlobalEvent.ACTIVE_AUTO_OPEN_STORE, this.activeAutoStore, this);
    }

    protected onDisable(): void {
        GlobalEvent.instance().removeEventListener(GlobalEvent.OPEN_STORE, this.openStore, this);
        GlobalEvent.instance().removeEventListener(GlobalEvent.ACTIVE_AUTO_OPEN_STORE, this.activeAutoStore, this);
    }

    start() {
        // console.log("this.channel: " + this.channel);
        (window as any).gameReady && (window as any).gameReady();
    }

    private addButton() {
        const clickEventHandler = new EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = 'PlayableAdsController';
        clickEventHandler.handler = "click";

        this.button = this.node.addComponent(Button);
        this.button.clickEvents.push(clickEventHandler);
        this.button.enabled = false;
    }
    private openStore() {
        //    console.log("open store");
        if (!this.isBuild) return;
        try {
            this.on_click_game_end();
            this.on_click_download();
        } catch (error) {
            let linkStore: string = this.getLinkStore();
            window.open(linkStore);
        }
    }

    private click() {
        //  console.log("autoOpenStore");
        GlobalEvent.instance().dispatchEvent(GlobalEvent.OPEN_STORE);
    }

    private activeAutoStore() {
        if (!this.isBuild) return;
        // console.log("activeAutoStore");
        this.isActiveAutoStore = true;
        // this.node.addComponent(BlockInputEvents);
        if (this.button) {
            this.button.enabled = true;
        }
    }

    public handleMuteSoundIronSource(): void {
        const isSoundIronSource = (window as any).ironSourceSoundState;
        MainData.instance().isPlaySound = isSoundIronSource;
        SoundManager.instance().setAllVolume();
    }

    update(dt: number) {
        this.handleMuteSoundIronSource();
        let channel = this.getChannel();
        if (channel != this.channel) this.channel = channel;
    }
    getChannel(): string {
        (window as any).advChannels = '{{__adv_channels_adapter__}}'
        return (window as any).advChannels;
    }







    getLinkStore() {
        let mobile = this.getMobileOS();
        switch (mobile) {
            case "android":
                return androidUrl;
            case "iOS":
                return iosUrl;
            default:
                return androidUrl;
        }
    }
    getMobileOS(): string {
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
        if (/android|Android/i.test(userAgent)) {
            return "android";
        } else if (/iPad|iPhone|iPod|Macintosh/.test(userAgent) && !(window as any).MSStream) {
            return "iOS";
        }
        return "unknown";
    }


    on_click_game_end() {
        super_html_playable.game_end();
    }

    on_click_download() {
        super_html_playable.download();
    }


}
