import { Camera, Material, Vec3, Node } from "cc";
import { PathBoard } from "./GameConfig";

export class Utils {
    static shuffle(array: any[]) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }
    static fisherYatesShuffle(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    static clamp(value: number, a: number, b: number): number {
        const min = Math.min(a, b);
        const max = Math.max(a, b);
        return Math.max(min, Math.min(max, value));
    }

    static areArraysEqual(a: number[], b: number[]): boolean {
        if (a.length !== b.length) return false;

        const sortedA = [...a].sort((x, y) => x - y);
        const sortedB = [...b].sort((x, y) => x - y);

        for (let i = 0; i < sortedA.length; i++) {
            if (sortedA[i] !== sortedB[i]) return false;
        }

        return true;
    }
    static isSubsetArray(a: number[], b: number[]): boolean {
        const setA = new Set(a);
        return b.every(value => setA.has(value));
    }
    static formatTime(seconds: number): string {
        if (seconds < 0) return "00:00";

        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = secs.toString().padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    }
    static randomFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
    static randomInt(low: number, high: number): number {
        return Math.floor(Math.random() * (1 + high - low) + low);
    }
    static divideVec3(a: Vec3, b: number | Vec3): Vec3 {
        if (typeof b === 'number') {
            return new Vec3(a.x / b, a.y / b, a.z / b);
        } else {
            return new Vec3(a.x / b.x, a.y / b.y, a.z / b.z);
        }
    }


    /**
     * Convert world position from a UI node (2D) to 3D world position
     * @param cameraUI Camera rendering UI (usually from Canvas)
     * @param camera3D 3D Camera you want to convert to
     * @param worldPosUI World position of the UI node
     * @param distanceFromCamera (optional) Distance from camera3D to the final 3D point (default = 10)
     * @returns Vec3 - the 3D world position
     */
    static convertUIWorldTo3DWorld(
        cameraUI: Camera,
        camera3D: Camera,
        worldPosUI: Vec3,
        distanceFromCamera: number = 1
    ): Vec3 {
        const screenPos = new Vec3();
        cameraUI.worldToScreen(worldPosUI, screenPos);

        // Gán khoảng cách từ camera3D đến điểm muốn đặt (trục z)
        // screenPos.z = distanceFromCamera;

        const worldPos3D = new Vec3();
        camera3D.screenToWorld(screenPos, worldPos3D);

        return worldPos3D;
    }

    /**
    * Converts a screen position to a 3D world position using a 3D camera.
    * 
    * ⚠️ Note:
    * - `screenPos.z` is not a depth value in world units.
    *   It represents the interpolation ratio between the camera's near and far clipping planes:
    *   - `z = 0.0` → near plane (closest to camera)
    *   - `z = 1.0` → far plane (farthest visible point)
    * 
    * If you want to convert a screen position to a 3D point at a **specific distance from the camera** (e.g. 10 units),
    * consider using raycasting or a function that calculates the point based on that distance (see the extended version).
    * 
    * @param camera3D The 3D camera used for conversion
    * @param screenPos The screen position (Vec3) where `z` is a ratio between near and far planes
    * @returns Vec3 - the corresponding 3D world position
    */
    static convertScreenTo3DWorld(
        camera3D: Camera,
        screenPos: Vec3,
    ): Vec3 {
        const worldPos3D = new Vec3();
        camera3D.screenToWorld(screenPos, worldPos3D);
        return worldPos3D;
    }


    static cloneMaterial(source: Material): Material {
        const newMat = new Material();
        newMat.copy(source);
        return newMat;
    }


    static changeLayerRecursively(node: Node, newLayer: number) {
        node.layer = newLayer;

        for (let child of node.children) {
            this.changeLayerRecursively(child, newLayer);
        }
    }

}