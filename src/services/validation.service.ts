import { IValidationService } from '../interfaces/auth.types';

export class ValidationService implements IValidationService {
    validUserEmailCheck(input: string): boolean {
        if (input.length === 0) {
            return false;
    }

    const emailCheck: RegExp = /^\S+@\S+\.\S+$/;
    if (!emailCheck.test(input)) {
        return false;
    }

    return true;
}

    validPasswordCheck(input: string): boolean {
        if (input.length === 0) {
            return false;
        }

        if(input.length < 8) {
            return false;
        }

        return true;
    }
}
