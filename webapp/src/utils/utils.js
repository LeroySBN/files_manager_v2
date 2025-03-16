export const getFullYear = () => new Date().getFullYear();

export const getFooterCopy = (isIndex) => ( isIndex ? 'File Push' : 'Files  by Leroy main dashboard');

export const getLatestNotification = () => {
  return ('<strong>Urgent requirement</strong> - complete by EOD');
}

export const validateCredentials = (email, password) => {
  // Basic email and password validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && password.length >= 6;
};
