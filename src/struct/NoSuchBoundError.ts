
export default class NoSuchBoundError extends Error {
    constructor(name: string) {
        super(`No such bound: ${name}`);
    }
}
