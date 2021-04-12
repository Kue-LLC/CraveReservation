export const formatTimeString = timeStr => {
    const hr = timeStr.substring(0, 2) * 1;
    const min = timeStr.substring(3, 5);
    let formattedTimeString = '';
    if (hr < 12) {
        formattedTimeString = `${hr}:${min}am`;
    } else if (hr === 12) {
        formattedTimeString = `${hr}:${min}pm`;
    } else if (hr === 24) {
        formattedTimeString = `${hr / 2}:${min}am`;
    } else {
        formattedTimeString = `${hr % 12}:${min}pm`;
    }
    return formattedTimeString;
};
