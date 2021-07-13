class Random {

    static generate(min: number, max: number): number {
        return min + Math.round((max - min) * Math.random());
    }

    static generateBool(): boolean {
        return !Math.round(Math.random());
    }

}

export default Random;
