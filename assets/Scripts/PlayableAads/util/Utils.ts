
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
    static randomInt(low: number, high: number): number {
        return Math.floor(Math.random() * (1 + high - low) + low);
    }
    static getValueOrNeg(value: number, negPercent: number): number {
        const randPercent = Math.random() * 100;
        return randPercent < negPercent ? -value : value;
    }
    static getSqlDate() {
        let date = new Date();
        return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
    }
}