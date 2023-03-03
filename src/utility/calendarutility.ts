export function formateTimeAMPM(date: Date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const visibleMinutes = minutes < 10 ? ('0' + minutes) : minutes;
    var strTime = hours + ':' + visibleMinutes + ':' + seconds + ' ' + ampm;
    return strTime;
}

export function getEpochTime(seconds: any) {
    if (!isNaN(seconds)) {
        const milliseconds = Math.floor(Number(seconds) / 1000);
        var utcSeconds = Number(milliseconds);
        var dateObject = new Date(0); // The 0 there is the key, which sets the date to the epoch
        dateObject.setUTCSeconds(utcSeconds);
        const date = dateObject.toLocaleString("default", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

        const time = dateObject.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
        return `${date}, ${time}`;
    }
    return "-";
}


export function getCurrentDateFormatYYYYMMDD() {
    return (new Date()).toISOString().split('T')[0]
}
