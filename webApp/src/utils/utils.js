export const getFullYear = () => new Date().getFullYear();

export const getLatestNotification = () => {
  return ('<strong>Urgent requirement</strong> - complete by EOD');
}

// Basic email and password validation
// export const validateCredentials = (email, password) => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email) && password.length >= 8;
// };
