const mexp = require('math-expression-evaluator')

function parseConversion (line) {
  const pattern = /^((\d+([.,]\d+)?)|\([^)]+\))\s?([a-zA-Z]+)((\s[a-zA-Z]+)*)$/
  const match = pattern.exec(line)

  if (match === null) {
    throw new Error('invalid input')
  }

  let amount
  if (match[1].startsWith('(')) {
    // Parse arithmetic expression.
    amount = mexp.eval(match[1])
  } else {
    // Just a plain amount.
    amount = parseFloat(match[1].replace(',', '.'))
  }

  let destinationCurrencies = match[5].trim().split(/\s/)
  if (match[5].trim() === '') {
    // If no destination currencies are given, return empty array instead of [''].
    destinationCurrencies = []
  }

  return {
    sourceCurrency: match[4],
    amount,
    destinationCurrencies
  }
}

module.exports.parseConversion = parseConversion
