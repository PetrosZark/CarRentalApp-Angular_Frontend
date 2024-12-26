// Represents a user retrieved from the database (read-only)
export interface UserReadOnly {
    id: string;             // Unique identifier for the user
    username: string;       // User's chosen username
    firstname: string;      // First name of the user
    lastname: string;       // Last name of the user
    vat: string;            // VAT number (for business or tax purposes)
    email: string;          // User's email address
    phone: string;          // User's contact phone number
    dateOfBirth: string;    // Date of birth (ISO format YYYY-MM-DD)
    gender: string;         // User's gender
    isActive: boolean;      // Indicates if the user is currently active
    createdAt: string;      // Timestamp when the user was created (ISO format)
    updatedAt: string;      // Timestamp of the last user update (ISO format)
    role: string;           // User's role (SUPER_ADMIN, SIMPLE_USER)
}

// Represents data required to create a new user (insert operation)
export interface UserInsert {
    firstname: string;      // First name of the user
    lastname: string;       // Last name of the user
    email: string;          // Email address for registration (unique per user)
    vat: string;            // VAT number (unique per user)
    phone: string;          // Contact phone number (unique per user)
    dateOfBirth: string;    // Date of birth (ISO format YYYY-MM-DD)
    gender: string;         // Gender of the user
    username: string;       // Desired username (must be unique)
    password: string;       // Password for account creation (hashed/stored securely)
}

// Represents user credentials used for authentication
export interface Credentials {
    username: string;       // Username for login
    password: string;       // Password for authentication
}

// Represents the authenticated user during a session
export interface LoggedInUser {
    id: string;             // Unique identifier for the logged-in user
    username: string;       // Username of the authenticated user
    firstname: string;      // First name of the logged-in user
    lastname: string;       // Last name of the logged-in user
    role: string;           // Role of the user (used for role-based adminGuard)
}
