const isType = require('./typeCheck').isType

const MAX_HOUR = 23;
const MAX_MINUTE = 59;
const MAX_SECOND = MAX_MINUTE;

// 时间字符串 => {小时，分钟，秒}
const timeStr2Obj = (value='00:00:00', options = {
    simple: false, 
}) => {
    value = isType(value, 'String') ? value : '00:00:00'
    let arr = value.split(':').slice(0, 3)
    let new_arr = [];

    for (let i = 0; i < arr.length; i++) {
        let item = String(arr[i]);
        if (item.length === 1) item = `0${item}`;
        if (!item) item = '00';
        new_arr.push(item);
    }

    let [hour, minute, second] = new_arr;
    hour = validateUnitByMax(hour, MAX_HOUR);
    minute = validateUnitByMax(minute, MAX_MINUTE);
    
    if (options.simple) return { hour, minute };

    second = validateUnitByMax(second, MAX_SECOND);

    return { hour, minute, second };
};

// {小时, 分钟, 秒} => 时间字符串
const obj2TimeStr = ({ hour = 0, minute = 0, second = 0}, options = {
    simple: false,
}) => {
    hour = validateUnitByMax(hour, MAX_HOUR)
    minute = validateUnitByMax(minute, MAX_MINUTE)

    if (hour < 10) {
        hour = `0${hour}`
    }
    if (minute < 10) {
        minute = `0${minute}`
    }
    
    if (options.simple) {
        return `${hour}:${minute}`
    }
    second = validateUnitByMax(second, MAX_SECOND)

    if (second < 10) {
        second = `0${second}`
    }

    return `${hour}:${minute}:${second}`
}

const seconds2Obj = value => {
    value = value || 0
    value = value % 86400
    let hour = parseInt(value / 3600)
    let minute = parseInt(value % 3600 / 60)
    let second = value % 3600 % 60
    return {
        hour, minute, second
    }
}

const obj2Seconds = ({ hour, minute, second}) => {
    hour = hour || 0
    minute = minute || 0
    second = second || 0
    return hour * 3600 + minute * 60 + second
}

const validateUnitByMax = (value, max) => {
    value = parseInt(value);
    if (value > max) value = Math.floor(value % (max + 1));
    if (isNaN(value) || value < 0) value = 0;
    return value;
};

module.exports = { 
    timeStr2Obj,
    obj2TimeStr,
    seconds2Obj, 
    obj2Seconds,
}
