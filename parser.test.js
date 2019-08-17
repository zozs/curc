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

test('parse no destination currency with arithmetic expression', () => {
  expect(parseConversion('(5+3-1)eur')).toEqual({
    amount: 7.0,
    sourceCurrency: 'eur',
    destinationCurrencies: []
  })
})

test('parse one destination currency with arithmetic expression', () => {
  expect(parseConversion('(0.5+100*100/20)dkk eur')).toEqual({
    amount: 500.5,
    sourceCurrency: 'dkk',
    destinationCurrencies: ['eur']
  })
})

test('parse two destination currencies with arithmetic expression', () => {
  expect(parseConversion('(53.21+19.90)jpy eur sek')).toEqual({
    amount: 73.11,
    sourceCurrency: 'jpy',
    destinationCurrencies: ['eur', 'sek']
  })
})

test('parse no source currency with arithmetic expression', () => {
  expect(() => parseConversion('(50.0+5)')).toThrow()
})

test('parse with invalid arithmetic expression', () => {
  expect(() => parseConversion('(50.0+)eur sek')).toThrow()
})
