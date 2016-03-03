const initMaxAndMiniByNum = (max, mini, num) => {
    max = max || num;
    mini = mini || 0;
    max = max > num ? num : parseInt(max);
    mini = mini > max ? max : parseInt(mini);
    return {max, mini}
}