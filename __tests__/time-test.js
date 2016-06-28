jest.unmock('../component/util/time');
jest.unmock('../component/util/typeCheck');
const {timeStr2Obj} = require('../component/util/time');

describe('timeStr2Obj', () => {
    it('0.0.0 should be 00:00:00', () => {
        expect(timeStr2Obj('0.0.0')).toEqual({
            hour: '00',
            sec: '00',
            min: '00'
        });
    });

    it('12:03:38 should be 12:03:38', () => {
        expect(timeStr2Obj('12:03:38')).toEqual({
            hour: '12',
            min: '03',
            sec: '38',
        });
    });

    it('undefined, null, xxx, [] all should be 00:00:00', () => {
        const value = {
            hour: '00',
            min: '00',
            sec: '00',
        };
        expect(timeStr2Obj(undefined)).toEqual(value);
        expect(timeStr2Obj(null)).toEqual(value);
        expect(timeStr2Obj([])).toEqual(value);
    });

    it('*&X&D0,0fwaef.0a should be 00:00:00', () => {
        expect(timeStr2Obj('&X&D0,0fwaef.0a ')).toEqual({
            hour: '00',
            sec: '00',
            min: '00'
        });
    });

    it('25:68:120 should be 01:08:12', () => {
        expect(timeStr2Obj('25:68:120')).toEqual({
            hour: '01',
            min: '08',
            sec: '12',
        });
    });

    it('-1.2:-2:-1 should be 00:00:00', () => {
        expect(timeStr2Obj('-1.2:-2:-1')).toEqual({
            hour: '00',
            min: '00',
            sec: '00',
        });
    });
});