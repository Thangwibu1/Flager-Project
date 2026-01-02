import {
    NotFoundRequestError,
    BadRequestError,
    ConflictRequestError,
    ForbiddenRequestError,
} from '../api/ApiError';

/**
 * Error thrown when a group chat is not found
 */
export class GroupChatNotFoundError extends NotFoundRequestError {
    constructor(message: string = 'Group chat not found') {
        super(message);
        this.name = 'GroupChatNotFoundError';
    }
}

/**
 * Error thrown when group chat creation fails
 */
export class GroupChatCreationFailedError extends BadRequestError {
    constructor(message: string = 'Failed to create group chat') {
        super(message);
        this.name = 'GroupChatCreationFailedError';
    }
}

/**
 * Error thrown when group chat update fails
 */
export class GroupChatUpdateFailedError extends BadRequestError {
    constructor(message: string = 'Failed to update group chat') {
        super(message);
        this.name = 'GroupChatUpdateFailedError';
    }
}

/**
 * Error thrown when group chat deletion fails
 */
export class GroupChatDeletionFailedError extends BadRequestError {
    constructor(message: string = 'Failed to delete group chat') {
        super(message);
        this.name = 'GroupChatDeletionFailedError';
    }
}

/**
 * Error thrown when a group chat already exists
 */
export class GroupChatAlreadyExistsError extends ConflictRequestError {
    constructor(message: string = 'Group chat already exists') {
        super(message);
        this.name = 'GroupChatAlreadyExistsError';
    }
}

/**
 * Error thrown when user is not a member of the group
 */
export class NotGroupMemberError extends ForbiddenRequestError {
    constructor(message: string = 'You are not a member of this group') {
        super(message);
        this.name = 'NotGroupMemberError';
    }
}

/**
 * Error thrown when user is not an admin of the group
 */
export class NotGroupAdminError extends ForbiddenRequestError {
    constructor(message: string = 'You are not an admin of this group') {
        super(message);
        this.name = 'NotGroupAdminError';
    }
}

/**
 * Error thrown when trying to add a member who is already in the group
 */
export class MemberAlreadyExistsError extends ConflictRequestError {
    constructor(message: string = 'User is already a member of this group') {
        super(message);
        this.name = 'MemberAlreadyExistsError';
    }
}

/**
 * Error thrown when trying to add member to a private chat
 */
export class CannotAddMemberToPrivateChatError extends BadRequestError {
    constructor(message: string = 'Cannot add members to a private chat') {
        super(message);
        this.name = 'CannotAddMemberToPrivateChatError';
    }
}

/**
 * Error thrown when group chat validation fails
 */
export class GroupChatValidationError extends BadRequestError {
    constructor(message: string = 'Group chat validation failed') {
        super(message);
        this.name = 'GroupChatValidationError';
    }
}

/**
 * Error thrown when group chat has reached maximum members
 */
export class GroupChatFullError extends BadRequestError {
    constructor(message: string = 'Group chat has reached maximum members') {
        super(message);
        this.name = 'GroupChatFullError';
    }
}
