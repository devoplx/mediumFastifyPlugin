const readingTimeRE = /^(\d+)\s+min\s+read$/;

const parseTime = (readingTime: string): number | Error => {
    if (readingTimeRE.test(readingTime)) {
        return parseInt(readingTime, 10);
    }

    return new Error('expected number');
};

export {parseTime}