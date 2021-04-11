export const validateRegister = (email: string, password: string) => {
  if (!email.includes('@')) {
    return [
      {
        field: 'email',
        message: 'invalid email',
      },
    ];
  }
  if (password.length <= 2) {
    return [
      {
        field: 'password',
        message: 'password must be greater than 2 characters',
      },
    ];
  }
  return null;
};
