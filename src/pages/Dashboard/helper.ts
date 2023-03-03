export const headerTimeKeys = [
    {
        keyName: "5_6_AM",
        labelName: "05:00 to 06:00 AM"
    },
    {
        keyName: "6_7_AM",
        labelName: "06:00 to 07:00 AM"
    },
    {
        keyName: "7_8_AM",
        labelName: "07:00 to 08:00 AM"
    },
    {
        keyName: "8_9_AM",
        labelName: "08:00 to 09:00 AM"
    },
    {
        keyName: "9_10_AM",
        labelName: "09:00 to 10:00 AM"
    },
    {
        keyName: "10_11_AM",
        labelName: "10:00 to 11:00 AM"
    },
    {
        keyName: "11_12_PM",
        labelName: "11:00 to 12:00 PM"
    },
    {
        keyName: "12_13_PM",
        labelName: "12:00 to 01:00 PM"
    },
    {
        keyName: "13_14_PM",
        labelName: "01:00 to 02:00 PM"
    }
    ,
    {
        keyName: "14_15_PM",
        labelName: "02:00 to 03:00 PM"
    },
    {
        keyName: "15_16_PM",
        labelName: "03:00 to 04:00 PM"
    },
    {
        keyName: "16_17_PM",
        labelName: "04:00 to 05:00 PM"
    },
    {
        keyName: "17_18_PM",
        labelName: "05:00 to 06:00 PM"
    }, {
        keyName: "18_19_PM",
        labelName: "06:00 to 07:00 PM"
    },
    {
        keyName: "19_20_PM",
        labelName: "07:00 to 08:00 PM"
    },
    {
        keyName: "20_21_PM",
        labelName: "08:00 to 09:00 PM"
    },
    {
        keyName: "21_22_PM",
        labelName: "09:00 to 10:00 PM"
    },
    {
        keyName: "22_23_PM",
        labelName: "10:00 to 11:00 PM"
    },
    {
        keyName: "23_24_PM",
        labelName: "11:00 to 12:00 AM"
    },
    {
        keyName: "night",
        labelName: "Night (12:00 to 5:00 AM)"
    },
    {
        keyName: "total",
        labelName: "Total"
    }
]

function getHoursSectionData(time_distance: any) {
    if (Array.isArray(time_distance)) {
        const timeDistanceInfo: any = {};
        let total = 0;
        for (let j = 0; j < time_distance.length; j++) {
            const { distance, start_hour } = time_distance[j],
                startHourNumber = Number(start_hour);
            // if ((startHourNumber >= 22 && startHourNumber <= 23) || (startHourNumber >= 0 && startHourNumber <= 4)) {
            if (startHourNumber >= 0 && startHourNumber <= 4) {
                if (Object.prototype.hasOwnProperty.call(timeDistanceInfo, "night")) {
                    timeDistanceInfo["night"] = +(timeDistanceInfo["night"] + Number(distance)).toFixed(12);
                } else {
                    timeDistanceInfo["night"] = Number(distance);
                }
            } else {
                const keyName = `${startHourNumber}_${startHourNumber + 1}_${(startHourNumber <= 10) ? 'AM' : 'PM'}`;
                timeDistanceInfo[keyName] = Number(distance);
            }
            total = +(total + Number(distance)).toFixed(12);
        }
        timeDistanceInfo["total"] = total;
        return timeDistanceInfo;
    }
    return null;
}

export function generateTableData(tableData: Array<any>) {
    const updateData = [];
    for (let i = 0; i < tableData.length; i++) {
        const data = {};
        const { time_distance, ...otherInfo } = tableData[i];
        const generatedTimeDistanceData = getHoursSectionData(time_distance);
        Object.assign(data, { ...otherInfo }, { ...generatedTimeDistanceData });
        updateData.push(data);
    }
    return updateData;
}