const readingTimeRegex = (readingTime: string): number | Error => {
    const numberRegex = /^(\d+)\s+min\s+read$/;
    const numberMatch = readingTime.match(numberRegex);
    let number;
    if (numberMatch) {
        number = parseInt(numberMatch[0], 10);
        return number;
    } else {
        console.log('Number not found', number);
    }

    if (typeof number !== 'number') {
        console.log(number);
        return new Error('expected number');
    }

    return number;
};

export { readingTimeRegex };
