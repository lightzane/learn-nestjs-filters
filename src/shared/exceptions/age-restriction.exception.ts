export class AgeRestrictionException extends Error {
    rootError: Error;
    constructor(message?: string, error?: Error) {
        super(message);
        error ? this.rootError = error : this.rootError = new Error();
    }
}