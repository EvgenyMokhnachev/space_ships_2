class Sequence {
    static sequence: number = 0;

    static get(): number {
        return ++this.sequence;
    }
}

export default Sequence;