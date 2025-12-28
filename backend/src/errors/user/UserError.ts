import {
    NotFoundRequestError,
    BadRequestError,
    ConflictRequestError,
} from '../api/ApiError';

/**
 * Error thrown when a user is not found
 */
export class UserNotFoundError extends NotFoundRequestError {
    constructor(message: string = 'User not found') {
        super(message);
        this.name = 'UserNotFoundError';
    }
}

/**
 * Error thrown when user creation fails
 */
export class UserCreationFailedError extends BadRequestError {
    constructor(message: string = 'Failed to create user') {
        super(message);
        this.name = 'UserCreationFailedError';
    }
}

/**
 * Error thrown when user update fails
 */
export class UserUpdateFailedError extends BadRequestError {
    constructor(message: string = 'Failed to update user') {
        super(message);
        this.name = 'UserUpdateFailedError';
    }
}

/**
 * Error thrown when user deletion fails
 */
export class UserDeletionFailedError extends BadRequestError {
    constructor(message: string = 'Failed to delete user') {
        super(message);
        this.name = 'UserDeletionFailedError';
    }
}

/**
 * Error thrown when a user already exists (e.g., duplicate email/username)
 */
export class UserAlreadyExistsError extends ConflictRequestError {
    constructor(message: string = 'User already exists') {
        super(message);
        this.name = 'UserAlreadyExistsError';
    }
}

/**
 * Error thrown when user credentials are invalid
 */
export class InvalidUserCredentialsError extends BadRequestError {
    constructor(message: string = 'Invalid user credentials') {
        super(message);
        this.name = 'InvalidUserCredentialsError';
    }
}

/**
 * Error thrown when user validation fails
 */
export class UserValidationError extends BadRequestError {
    constructor(message: string = 'User validation failed') {
        super(message);
        this.name = 'UserValidationError';
    }
}

/**
 * Error thrown when user is inactive or disabled
 */
export class UserInactiveError extends BadRequestError {
    constructor(message: string = 'User account is inactive or disabled') {
        super(message);
        this.name = 'UserInactiveError';
    }
}
