/*
* Function to generate a UNIX timestamp
* This function returns the current time as a UNIX timestamp, which is the number of seconds 
* that have elapsed since January 1, 1970 (midnight UTC/GMT).
*/
function getUnixTimestamp() {
  return Math.floor(Date.now() / 1000);
}

/*
* Function to convert UNIX timestamp to human-readable format
* This function takes a UNIX timestamp as input and converts it to a human-readable date and time string.
* @param {number} unixTime - The UNIX timestamp to be converted.
* @returns {string} - The human-readable date and time string.
*/
function convertUnixToHumanReadable(unixTime) {
  const date = new Date(unixTime * 1000);
  return date.toLocaleString();
}

module.exports = {
  getUnixTimestamp,
  convertUnixToHumanReadable
}