
record-is-doji [![Build Status](https://travis-ci.org/strong-roots-capital/record-is-doji.svg?branch=master)](https://travis-ci.org/strong-roots-capital/record-is-doji) [![npm version](https://img.shields.io/npm/v/record-is-doji.svg)](https://npmjs.org/package/record-is-doji) [![npm](https://img.shields.io/npm/dt/record-is-doji.svg)](https://www.npmjs.com/package/record-is-doji)
=============================================================================================================================================================================================================================================================================================================================================================================================

> Test if a Japanese candlestick qualifies as a doji

Install
-------

```shell
npm install record-is-doji
```

Use
---

```typescript
import isDoji from 'record-is-doji'
import Record from 'timeseries-record'

const doji: Record = {
  Open: 0,
  High: 100,
  Low: 0,
  Close: 8,
  Time: 1,
  Volume: 1
}

const nonDoji: Record = {
  Open: 0,
  High: 100,
  Low: 0,
  Close: 100,
  Time: 1,
  Volume: 1
}

console.log(isDoji(doji))
//=> true

console.log(isDoji(nonDoji))
//=> false
```

Related
-------

*   [timeseries-record](https://github.com/strong-roots-capital/timeseries-record)

## Index

---

