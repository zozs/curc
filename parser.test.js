/* eslint-env jest */

const { parseConversion } = require('./parser')

test('parse no destination currency', () => {
  expect(parseConversion('10eur')).toEqual({
    amount: 10.0,
    sourceCurrency: 'eur',
    destinationCurrencies: []
  })
})

test('parse one destination currency', () => {
  expect(parseConversion('20.50dkk eur')).toEqual({
    amount: 20.5,
    sourceCurrency: 'dkk',
    destinationCurrencies: ['eur']
  })
})

test('parse two destination currencies', () => {
  expect(parseConversion('300jpy eur sek')).toEqual({
    amount: 300.0,
    sourceCurrency: 'jpy',
    destinationCurrencies: ['eur', 'sek']
  })
})

test('parse amount with comma', () => {
  expect(parseConversion('13,37gbp')).toEqual({
    amount: 13.37,
    sourceCurrency: 'gbp',
    destinationCurrencies: []
  })
})

test('parse no source currency', () => {
  expect(() => parseConversion('50.0')).toThrow()
})
