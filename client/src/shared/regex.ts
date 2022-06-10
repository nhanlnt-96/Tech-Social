export const fullNameRegex = /^([a-zA-Z' ]+)$/;

export const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/;
