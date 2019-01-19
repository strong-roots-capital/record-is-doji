const expect = require('chai').expect

import Record from 'timeseries-record'

/**
 * Library under test
 */
import isDoji from '../src/record-is-doji'


/**
 * Generate a random number between min and max
 */

function getRandomInt(min: number, max: number): number {
    return min + Math.floor(Math.random() * (max - min + 1));
}

describe('is-doji', () => {

    /**
     * Create a Record with specified body:spread ratio.
     *
     * @param {number} bodyToSpreadRatio Desired ratio of candle body to spread.
     * @return {Record} A Record with specified body:spread ratio.
     */
    function makeRecord(bodyToSpreadRatio: number = 8): Record {
	const Open = getRandomInt(1, 100)
        let Close: number
        do {
            Close = getRandomInt(1, 100)
        } while (Close == Open)
	const spread = 100.0 * Math.abs(Open - Close) / bodyToSpreadRatio
	const Low = getRandomInt(Math.max(Open, Close) - spread, Math.min(Open, Close))
	const High = Low + 100.0 * Math.abs(Open - Close) / bodyToSpreadRatio
	const record: Record = {
	    Open: Open,
	    High: High,
	    Low: Low,
	    Close: Close,
            Time: 1,
            Volume: 1
	}
        // console.log(record)
        return record
    }

    describe('makeRecord generator', () => {

	let record: Record
        let recordData: number[]

	beforeEach(() => {
	    record = makeRecord()
            recordData = [record.Open, record.High, record.Low, record.Close]
	})

	it('should return low as the lowest value', () => {
	    expect(Math.min(...recordData)).to.equal(record.Low)
	})
	it('should return high as the highest value', () => {
            expect(Math.max(...recordData)).to.equal(record.High)
	})
	it('should return open between high and low', () => {
	    expect(Math.max(...recordData)).to.be.at.least(record.Open)
	    expect(Math.min(...recordData)).to.be.at.most(record.Open)
	})
	it('should return close between high and low', () => {
	    expect(Math.max(...recordData)).to.be.at.least(record.Close)
	    expect(Math.min(...recordData)).to.be.at.most(record.Close)
	})
        it('should not have open equal to close', () => {
            expect(record.Open).to.not.equal(record.Close)
        })
    })

    describe('#isDoji()', () => {

        let record: Record
        let spread: number

        beforeEach(() => {
            record = makeRecord()
            spread = 8
        })

	it('should return true when given a doji', () => {
	    spread = 5
	    record = makeRecord(spread)
	    expect(isDoji(record, spread)).to.equal(true)
	})

	it('should return false when given a non-doji', () => {
	    spread = 5
	    record = makeRecord(spread * 2)
	    expect(isDoji(record, spread)).to.equal(false)
	})

        it('should return true when given a record with open equal to close', () => {
            record = {Open: 26, High: 26, Low: 26, Close: 26, Time: 1, Volume: 1}
	    expect(isDoji(record)).to.equal(true)
        })

        it('should return true when spread is exactly the maximum threshold', () => {
            spread = 8
            record = {Open: 0, Low: 0, High: 100, Close: 8, Time: 1, Volume: 1}
            expect(isDoji(record, spread)).to.equal(true)
        })

        it('should return true when spread is a pip under the maximum threshold', () => {
            spread = 8
            record = {Open: 0, Low: 0, High: 100.0000001, Close: 8, Time: 1, Volume: 1}
            expect(isDoji(record, spread)).to.equal(true)
        })

        it('should return false when spread is a pip over the maximum threshold', () => {
            spread = 8
            record = {Open: 0, Low: 0, High: 99.9999999, Close: 8, Time: 1, Volume: 1}
            expect(isDoji(record, spread)).to.equal(false)
        })
    })

})
