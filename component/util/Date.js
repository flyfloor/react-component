import {initMaxAndMiniByNum} from './util';

export function validateDate(dateStr, options={
    begin: null,
    end: null,
}){
    let begin = options.begin,
        end = options.end;

    let date = dateStr ? new Date(dateStr) : new Date();

    begin = new Date(begin);
    if (end) end = new Date(end)

    let beginY = begin.getFullYear();
    let endY;
    if (end) endY = end.getFullYear();

    if (beginY && endY && beginY > endY) begin = end;
    if (begin.getFullYear() && date < begin) date = begin;
    if (endY && date > end) date = end;

    return drawDate(date)
}

export function trimDate(date = new Date()){
    let {year, month, day} = drawDate(date);
    return formatDate(year, month, day);
}

function drawDate(date){
    let year = date.getFullYear() || 1970;
    let month = date.getMonth() + 1 || 1;
    let day = date.getDate() || 1;
    return {year, month, day}
}

export function formatDate(year, month, day){
    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;
    return `${year}-${month}-${day}`
}
