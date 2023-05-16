const nFormatter = (num, digits) => {
  // const lookup = [
  //   { value: 1, symbol: "" },
  //   { value: 1e3, symbol: "K" },
  //   { value: 1e6, symbol: "M" },
  //   { value: 1e9, symbol: "G" },
  //   { value: 1e12, symbol: "T" },
  //   { value: 1e15, symbol: "P" },
  //   { value: 1e18, symbol: "E" }
  // ]

  // const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  // const item = lookup.slice().reverse().find((item) => {
  //   return num >= item.value
  // })
  // return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0"
  if (Math.abs(num) > 999 && Math.abs(num) <= 999999) {
    return Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k'
  }
  if (Math.abs(num) > 999999 && Math.abs(num) < 999999999) {
    return Math.sign(num) * ((Math.abs(num) / 1000000).toFixed(1)) + 'M'

  }
  if (Math.abs(num) > 999999999) {
    return Math.sign(num) * ((Math.abs(num) / 1000000000).toFixed(1)) + 'B'

  }
  return num
}
function secondsToHms(d) {
  console.log("d==>",d)
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? " h " : " h ") : "";
  var mDisplay = h < 100 ? m + (m <= 1 ? " m" : " m") : "";
  return hDisplay + mDisplay;
}
export { nFormatter, secondsToHms }