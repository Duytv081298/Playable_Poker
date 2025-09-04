import { _decorator, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {
    @property(AudioSource)
    bgm: AudioSource = null;

    private isPlayedBGM: boolean = false;
    private static _instance: AudioManager;

    private audioMap: Map<string, AudioSource> = new Map();

    public static get instance(): AudioManager {
        return AudioManager._instance;
    }

    protected onLoad(): void {
        if (AudioManager._instance) {
            this.node.destroy();
            return;
        }
        AudioManager._instance = this;

        const sources = this.node.getComponentsInChildren(AudioSource);
        sources.forEach(audio => {
            this.audioMap.set(audio.node.name, audio);
        });
        console.log('audioMap :', this.audioMap);
    }

    playBGM() {
        return;
        if (this.isPlayedBGM) return;
        this.isPlayedBGM = true;
        this.bgm.play();

        console.log('BGM');
    }

    stopBGM() {
        this.bgm.stop();
    }

    playSoundFX(name: string) {
        const audio = this.audioMap.get(name);
        if (audio) {
            audio.currentTime = 0;
            audio.play();
        } else {
            console.warn(`AudioSource with node name "${name}" not found!`);
        }
    }
}
