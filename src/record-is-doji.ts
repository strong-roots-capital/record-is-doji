/**
 * record-is-doji
 * Test if a Japanese candlestick qualifies as a doji
 */

import ow from 'ow'
import Record from 'timeseries-record'

function validPercentage(x: number) {
    return x > 0 && x <= 100 || `Expected ${x} to be a valid percentage (0 < percent <= 100)`
}

/**
 * Returns true if candle qualifies as a doji.
 *
 * @param {Record} The time-series record to inspect.
 * @param {number} maximumBodyAsPercentOfSpread Largest body:spread
 * ratio to qualify as a doji.
 * @return {boolean} True if candle is a doji.
 */
function isDoji(candle: Record, maximumBodyAsPercentOfSpread: number = 8): boolean {

    ow(maximumBodyAsPercentOfSpread, ow.number.is(x => validPercentage(x)))

    const body = Math.abs(candle.Open - candle.Close)
    const spread = candle.High - candle.Low
    return body == 0 || body / spread * 100 <= maximumBodyAsPercentOfSpread
}


export default isDoji
