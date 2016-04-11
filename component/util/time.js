const MAX_HOUR = 23;
const MAX_MIN = 59;
const MAX_SEC = MAX_MIN;

const timeStr2Obj = (value='00:00:00', options = {
    simple: false, 
}) => {
    let arr = value.split(':').slice(0, 3);
    let new_arr = [];

    for (let i = 0; i < arr.length; i++) {
        let item = String(arr[i]);
        if (item.length > 2) item = item.slice(0, 2);
        if (item.length === 1) item = `0${item}`;
        if (!item) item = '00';
        new_arr.push(item);
    }

    let [hour, min, sec] = new_arr;
    hour = validateUnitByMax(hour, MAX_HOUR);
    min = validateUnitByMax(min, MAX_MIN);
    
    if (options.simple) return { hour, min };

    sec = validateUnitByMax(sec, MAX_SEC);

    return { hour, min, sec };
};

const validateUnitByMax = (value, max) => {
    value = String(parseInt(value));
    if (value > max) value = String(Math.floor(value % (max + 1)));
    if (isNaN(value) || value < 0) value = '00';
    if (value.length === 1) value = `0${value}`;
    return value;
};

module.exports = { timeStr2Obj };
