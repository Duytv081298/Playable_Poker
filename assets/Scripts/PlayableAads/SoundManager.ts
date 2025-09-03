
import { _decorator, Component, AudioClip, AudioSource, resources, CCString } from "cc";
import MainData from "./MainData";
import { Utils } from "./util/Utils";
import { NameSound } from "../Config/GameConfig";

const { ccclass, property } = _decorator;
@ccclass("SoundData")
export default class SoundData extends Component {

    @property(AudioSource)
    bgAudio: AudioSource = null;

    protected onLoad(): void {

        SoundManager.instance().bgAudio = this.bgAudio;
        for (let i = 0; i < this.node.children.length; i++) {
            let audioSource: AudioSource = this.node.children[i].getComponent(AudioSource);
            if (!audioSource) continue;
            SoundManager.instance().setSound(audioSource);
        }
    }
}




export class SoundManager {
    public isPlaySound: boolean = true;
    isPlayBg: boolean = false;
    private static soundManager: SoundManager | null = null;
    @property(AudioSource)
    bgAudio: AudioSource = null;
    clips: Map<string, AudioSource> = new Map();
    public static instance(): SoundManager {
        if (!SoundManager.soundManager) {
            SoundManager.soundManager = new SoundManager();
        }
        return SoundManager.soundManager;
    }

    setSound(audioSource: AudioSource) {
        if (this.clips.has(audioSource.node.name)) return;
        this.clips.set(audioSource.node.name, audioSource);
    }
    setAllVolume() {

    }
    playEffect(nameSound: string, volume: number = -1) {
        if (!MainData.instance().isPlaySound || nameSound === "") return;
        // console.log("playEffect", nameSound);

        const clip = this.clips.get(nameSound);
        if (clip) {
            let v = volume == -1 ? clip.volume : volume;
            clip.playOneShot(clip.clip, v);
        }
    }

    playEffectLoop(nameSound: string, volume: number = -1) {
        if (!MainData.instance().isPlaySound || nameSound === "") return;
        // console.log("playEffect", nameSound);

        const clip = this.clips.get(nameSound);
        if (clip) {
            let v = volume == -1 ? clip.volume : volume;
            clip.play()
        }
    }
    stopEffectLoop(nameSound: string, volume: number = -1) {
        if (!MainData.instance().isPlaySound || nameSound === "") return;
        // console.log("playEffect", nameSound);

        const clip = this.clips.get(nameSound);
        if (clip) {
        let v = volume == -1 ? clip.volume : volume;
            clip.stop()
        }
    }


    private lastPlayTimes: Map<string, number> = new Map();
    private soundCooldowns: Map<string, number> = new Map([
        [NameSound.Pop_1, 100],
        [NameSound.Drop, 100],
    ]);

    playEffectPop_1() {
        this.playEffectLimit(NameSound.Pop_1)
    }
    playEffectDrop() {
        this.playEffectLimit(NameSound.Drop)
    }
    playEffectLimit(nameSound: string) {
        if (!MainData.instance().isPlaySound || nameSound === "") return;

        let currentTime = Date.now();
        let lastTime = this.lastPlayTimes.get(nameSound) || 0;
        let cooldown = this.soundCooldowns.get(nameSound) || 0;

        if (currentTime - lastTime < cooldown) return;
        this.lastPlayTimes.set(nameSound, currentTime);

        const clip = this.clips.get(nameSound);
        if (clip) {
            clip.playOneShot(clip.clip, clip.volume);
        }
    }




    playBackgroundMusic() {
        if (!this.bgAudio || !this.isPlaySound || this.isPlayBg) return;
        this.isPlayBg = true;
        this.bgAudio.play();
    }
    // resumeBackgroundMusic() {
    //     if (!this.bgAudio || !this.isPlaySound || !this.bgAudio.isPlaying) return;
    //     this.bgAudio.resume();
    // }
    // pauseBackgroundMusic() {
    //     if (!this.bgAudio || !this.isPlaySound || !this.bgAudio.isPlaying) return;
    //     this.bgAudio.pause();
    // }
    stopBackgroundMusic() {
        if (!this.bgAudio || !this.isPlaySound) return;
        this.bgAudio.stop();
    }
    playSoundSad() {
        let listNameSound: string[] = ["Ah", "Come_On", "Hey", "Oooh", "Uh_Oh", "Youre_Kidding_Me"];

        for (let i = 0; i < listNameSound.length; i++) {
            const nameSound = listNameSound[i];
            if (this.clips.has(nameSound)) {
                const clip = this.clips.get(nameSound);
                if (clip.playing) return;
            }
        }
        let randomIndex = Utils.randomInt(0, listNameSound.length - 1);
        if (this.clips.has(listNameSound[randomIndex])) {
            const clip = this.clips.get(listNameSound[randomIndex]);
            if (clip) {
                clip.play()
            }
        }

    }

    playSoundHappy() {
        let listNameSound: string[] = ["Amazing", "Good", "Good_Job_1", "Great_Job", "Thats_Cute", "Woohoo", "Wow"];

        for (let i = 0; i < listNameSound.length; i++) {
            const nameSound = listNameSound[i];
            if (this.clips.has(nameSound)) {
                const clip = this.clips.get(nameSound);
                if (clip.playing) return;
            }
        }
        let randomIndex = Utils.randomInt(0, listNameSound.length - 1);
        if (this.clips.has(listNameSound[randomIndex])) {
            const clip = this.clips.get(listNameSound[randomIndex]);
            if (clip) {
                clip.play()
            }
        }

    }
}


export enum Sound {
    touch = "touch",
    flower_pick = "flower_pick",
    combo = "combo",
    merg = "merg"
}