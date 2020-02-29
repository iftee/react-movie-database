// Convert time to hours and minutes
export const toHourMinute = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours}h ${minutes}min`;
}

// Convert number to USD format
export const toUSD = (money) => {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });
  return formatter.format(money); 
}

// Convert date to Month DD, YYYY format
export const formatDate = (date) => {
  var providedDate = new Date(date);
  var monthInWord = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return monthInWord[providedDate.getMonth()] + ' ' + providedDate.getDate() + ', ' + providedDate.getFullYear();
}

// Add commas to a number
export const numberWithCommas = (number) => {
  var parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

// Get last 20 years in array
export const last20Years = () => {
  var currentYear = new Date().getFullYear();
  var endYear = currentYear - 20;
  var yearsArray = [];
  for (var i = currentYear; i > endYear; i--) {
    yearsArray.push(i);
  }
  return yearsArray;
}

// Compare object values in array  for sorting
// For ascending order
// arrayName.sort(compareValues('objectPropertyName'))
// For descending order
// arrayName.sort(compareValues('objectPropertyName', 'desc'))
export const compareValues = (key, order = 'asc') => {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }
    const varA = (typeof a[key] === 'string')
      ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string')
      ? b[key].toUpperCase() : b[key];
    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}