curc
====

Currency converter written in Node.js. Uses fixer.io for exchange rates.

## Installation

`npm i` as usual.

## Configuration

Since fixer.io is used for exchange rates, registration is required to get API key, which is then added to the `.env` file.

See `.env.example` for an example. The default destination currency can be changed as well.

## Usage

Example input/output. Default destination currency is SEK.

```
curc> 11.99eur
11.99 EUR =>
  125.70 SEK

curc> 10usd
10.00 USD =>
  91.58 SEK

curc> 30sek usd
30.00 SEK =>
  3.28 USD

curc> 40eur sek usd
40.00 EUR =>
  419.36 SEK
  45.79 USD
```

## License

```
Copyright 2018, 2019, Linus Karlsson

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

