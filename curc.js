require('dotenv').config()
const axios = require('axios')
const readline = require('readline')

// Start by setting up a Promise to fetch current currency data in the background.
const apiKey = process.env.API_KEY

// Debugging fetch of exchange rates.
/* const ratesPromise = new Promise((resolve, reject) => {
  const testData = require('./testdata.json')
  setTimeout(resolve, 5000, testData)
}) */

// Production fetch of exchange rates.
const ratesPromise = axios.get(`http://data.fixer.io/api/latest?access_key=${apiKey}`)
  .then(response => response.data)
  .catch(e => console.error('An error occured when accessing Fixer.IO to fetch exchange rates:', e))

// Construct list of all possible currencies from rates above.
const currenciesPromise = ratesPromise.then(data => Object.keys(data.rates))

// Command line interface.
const cli = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'curc> '
})

cli.prompt()

cli.on('line', async line => {
  switch (line.trim()) {
    case 'q':
    case 'quit':
      cli.close()
      break
    case 'currencies':
      const currencies = await currenciesPromise
      for (const currency of currencies) {
        console.log(currency)
      }
      break
    case 'rates':
      const rates = await ratesPromise
      for (const [c, rate] of Object.entries(rates.rates)) {
        console.log(`${c}: ${rate}`)
      }
      break
    default:
      try {
        const defaultDestCurrency = process.env.DEFAULT_DEST_CURRENCY
        let {amount, sourceCurrency, destinationCurrencies} = parseConversion(line.trim())

        sourceCurrency = await normalizeCurrency(sourceCurrency)
        if (destinationCurrencies.length === 0) {
          destinationCurrencies = [defaultDestCurrency]
        }

        const converted = await convert(amount, sourceCurrency, destinationCurrencies)

        console.log(`${amount.toFixed(2)} ${sourceCurrency} =>`)
        for (const {amount: a, currency: c} of converted) {
          console.log(`  ${a.toFixed(2)} ${c}`)
        }
      } catch (e) {
        console.log(e.message)
      }
  }
  cli.prompt()
})

function parseConversion (line) {
  const pattern = /^(\d+([.,]\d+)?)\s?([a-zA-Z]+)((\s[a-zA-Z]+)*)$/
  const match = pattern.exec(line)

  if (match === null) {
    throw Error('invalid input')
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

async function convert (amount, srcCurrency, destCurrencies) {
  return Promise.all(destCurrencies.map(dst => convertSingle(amount, srcCurrency, dst)))
}

async function convertSingle (amount, srcCurrency, destCurrency) {
  srcCurrency = await normalizeCurrency(srcCurrency)
  destCurrency = await normalizeCurrency(destCurrency)

  // First convert from srcCurrency to base, then from base to destCurrency.
  const rates = await ratesPromise
  const baseAmount = amount / rates.rates[srcCurrency]
  const destAmount = baseAmount * rates.rates[destCurrency]
  return {
    amount: destAmount,
    currency: destCurrency
  }
}

async function normalizeCurrency (currency) {
  const upper = currency.toUpperCase()
  const curs = await currenciesPromise
  if (curs.includes(upper)) {
    return upper
  }
  throw Error(`unknown currency: ${currency}`)
}
