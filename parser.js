function parseConversion (line) {
  const pattern = /^(\d+([.,]\d+)?)\s?([a-zA-Z]+)((\s[a-zA-Z]+)*)$/
  const match = pattern.exec(line)

  if (match === null) {
    throw new Error('invalid input')
  }

  let destinationCurrencies = match[4].trim().split(/\s/)
  if (match[4].trim() === '') {
    // If no destination currencies are given, return empty array instead of [''].
    destinationCurrencies = []
  }

  return {
    amount: parseFloat(match[1].replace(',', '.')),
    sourceCurrency: match[3],
    destinationCurrencies
  }
}

module.exports.parseConversion = parseConversion
