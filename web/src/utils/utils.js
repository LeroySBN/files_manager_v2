export const getFullYear = () => new Date().getFullYear();

export const getFooterCopy = (isIndex) => ( isIndex ? 'File Push' : 'Files  by Leroy main dashboard');

export const getLatestNotification = () => {
  return ('<strong>Urgent requirement</strong> - complete by EOD');
}
