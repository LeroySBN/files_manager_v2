export const getFullYear = () => new Date().getFullYear();

export const getFooterCopy = (isIndex) => ( isIndex ? 'File Push' : 'File Push main dashboard');

export const getLatestNotification = () => {
  return ('<strong>Urgent requirement</strong> - complete by EOD');
}
