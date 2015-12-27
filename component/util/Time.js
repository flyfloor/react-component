export function validateTime(value, options = {
    spacer: ':', 
    simple: false, 
    maxHour: 23, 
    miniHour: 0, 
    maxMin: 59, 
    miniMin: 0, 
    maxSec: 59, 
    miniSec: 0
}) {
    let {
        spacer,
        simple,
    } = options;
    
    spacer = spacer || ':';
    value = value || `00${spacer}00${spacer}00`;
    let arr = value.split(spacer);
    arr = arr.slice(0, 3);

    let {max: maxHour, mini: miniHour} = initMaxAndMiniByNum(options.maxHour, options.miniHour, 23);
    let {max: maxMin, mini: miniMin} = initMaxAndMiniByNum(options.maxMin, options.miniMin, 59);
    let {max: maxSec, mini: miniSec} = initMaxAndMiniByNum(options.maxSec, options.miniSec, 59);

    for (let i = 0; i < arr.length; i++) {
        let item = String(arr[i])
        if (item.length > 2) arr[i] = item.slice(0, 2)
        if (item.length === 1) arr[i] = `0${item}`;
        if (!item) arr[i] = '00';
    };

    let [hour, min, sec] = arr;
    if (hour > maxHour) hour = String(Math.floor(hour % (maxHour + 1)));
    if (isNaN(hour) || hour < miniHour) hour = String(miniHour);
    if (hour.length === 1) hour = `0${hour}`;
    
    if (isNaN(min) || min < miniMin) min = String(miniMin);
    if (min > maxMin) min = String(Math.floor(min % 60));
    if (min.length === 1) min = `0${min}`;
    
    if (sec > maxSec) sec = String(Math.floor(sec % 60));
    if (options.simple) {
        return {
            hour: hour,
            min: min,
        }
    }
    if (isNaN(sec) || sec < miniSec) sec = String(miniSec);
    if (sec.length === 1) sec = `0${sec}`;

    return {
        hour: hour,
        min: min,
        sec: sec,
    }
}

export function initMaxAndMiniByNum(max, mini, num){
    max = max || num;
    mini = mini || 0;
    max = max > num ? num : parseInt(max);
    mini = mini > max ? max : parseInt(mini);
    return {max, mini}
}
