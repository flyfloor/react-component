export function validateTime(value="00:00:00") {
    let arr = value.split(':');
    arr = arr.slice(0, 3);
    
    for (let i = 0; i < arr.length; i++) {
        let item = String(arr[i])
        if (item.length > 2) arr[i] = item.slice(0, 2)
        if (item.length === 1) arr[i] = `0${item}`;
        if (!item) arr[i] = '00';
    };

    let [hour, min, sec] = arr;
    if (hour > 23) hour = String(Math.floor(hour % 24));
    if (isNaN(hour) || hour < 0) hour = "00";
    if (hour.length === 1) hour = `0${hour}`;

    if (isNaN(min) || min < 0) min = "00";
    if (min > 59) min = String(Math.floor(min % 60));
    if (min.length === 1) min = `0${min}`;
    
    if (sec > 59) sec = String(Math.floor(sec % 60));
    if (isNaN(sec) || sec < 0) sec = "00";
    if (sec.length === 1) sec = `0${sec}`;

    return `${hour}:${min}:${sec}`;
}