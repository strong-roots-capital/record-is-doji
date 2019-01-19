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
