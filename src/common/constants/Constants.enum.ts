export enum Constants {

    SUCCESS = 'Operation completed successfully.',
    FAILED = 'Operation failed. Please try again later.',

    USER_NOT_FOUND = 'User not found.',
    USER_ALREADY_EXISTS = 'User already exists.',
    USER_CREATED_SUCCESS = 'User created successfully.',
    USER_UPDATED_SUCCESS = 'User updated successfully.',
    USER_DELETED_SUCCESS = 'User deleted successfully.',
    USER_LISTED = 'User listed.',

    INVALID_CREDENTIALS = 'Invalid credentials. Please try again.',
    ACCESS_DENIED = 'Access denied. You do not have permission to perform this action.',
    TOKEN_EXPIRED = 'Token has expired. Please log in again.',
    TOKEN_INVALID = 'Invalid token. Please log in again.',

    DB_CONNECTION_ERROR = 'Database connection error. Please contact support.',
    NOTE_NOT_FOUND = 'Requested note not found.',
    NOTE_CREATE_FAIL = 'Failed to create the note.',
    NOTE_UPDATE_FAIL = 'Failed to update the note.',
    NOTE_DELETE_FAIL = 'Failed to delete the note.',

    LOGIN_REQUIRED = 'Please log in to continue.',
    LOGIN_SUCCESS = 'Logged in successfully.',
    LOGOUT_SUCCESS = 'Logged out successfully.',

    NOTE_CREATED = 'Note created successfully.',
    NOTE_UPDATED = 'Note updated successfully.',
    NOTE_DELETED = 'Note deleted successfully.',
    NOTES_LISTED = 'Notes listed.',

    REQUIRED_FIELD = 'This field is required.',
    INVALID_INPUT = 'Invalid input format.',
    
    EMAIL_REQUIRED = 'Email address is required.',
    EMAIL_INVALID = 'Please enter a valid email address.',
    
    PASSWORD_REQUIRED = 'Password is required.',
    PASSWORD_TOO_SHORT = 'Password must be at least 8 characters long.',
    PASSWORD_TOO_WEAK = 'Password must contain uppercase, lowercase, numbers, and special characters.',
    
    NAME_REQUIRED = 'Name is required.',
    NAME_TOO_SHORT = 'Name must be at least 2 characters long.',
    NAME_TOO_LONG = 'Name must be less than 50 characters.',
    
    PHONE_REQUIRED = 'Phone number is required.',
    PHONE_INVALID = 'Please enter a valid phone number.',
    
    ONLY_ALPHANUMERIC = 'This field can only contain letters and numbers.',
    ONLY_LETTERS = 'This field can only contain letters.',
}