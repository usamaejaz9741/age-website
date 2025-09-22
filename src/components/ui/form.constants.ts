// Form variants and constants for handling forms
export const formFields = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  password: 'password',
  // Add other form field names
} as const;

export const formErrors = {
  required: "This field is required",
  email: "Please enter a valid email address",
  password: "Password must be at least 8 characters",
  // Add other error messages
} as const;