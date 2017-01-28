// date => date string
const formatDate = (date, fmt="yyyy-MM-dd") => {
    if (!date) {
        return ''
    }
    let obj = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(), 
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds(),
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, String(date.getFullYear()).substr(4 - RegExp.$1.length));
    }
    for (let k in obj) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? obj[k] : `00${obj[k]}`.substr(String(obj[k]).length));
        }
    }
    return fmt;
}

// extract date to {year, month, day, hour, minute, second, miniSecond}
const extractDate = (date, opt) => {
    opt = opt || {}
    if (!date) {
        date = new Date()
    }
    if (!opt.showTime) {
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
        }
    }
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        miniSecond: date.getMilliseconds(),
    }
}

module.exports = {
    formatDate, extractDate
}