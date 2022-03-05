
export default class ParametersOutsideBoundsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ParametersOutsideBoundsError';
    }
}
