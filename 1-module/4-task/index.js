function checkSpam(str) {
  let strlower = str.toLowerCase();
  return strlower.includes('1xBet'.toLowerCase()) || strlower.includes('XXX'.toLowerCase());
}
