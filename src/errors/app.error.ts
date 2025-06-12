export class AppError extends Error {
    public readonly type: string;
    public readonly statusCode: number;

    constructor(type: string, message: string, statusCode: number) {
        // Call the parent constructor (Error) with the message
        super(message);

        // Save our custom properties
        this.type = type;
        this.statusCode = statusCode;

        // This line is important for making 'instanceof AppError' work correctly
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
