const formatNumber = () => {};
function kFormatter(num: number) {
  const absNum = Math.abs(num);
  const sign = Math.sign(num);
  const thousand = 1000;
  if (absNum >= thousand) {
    return sign * Number((absNum / 1000).toFixed(1)) + 'k'; //convert to K for number from > 1000
  }
  return sign * absNum;
}

export { formatNumber, kFormatter };
