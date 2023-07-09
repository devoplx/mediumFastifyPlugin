const readingTimeRegex = (readingTime: string): number | Error => {
    const numberMatch = readingTime.match(/\d+/);
    if (numberMatch) {
        const number = parseInt(numberMatch[0], 10);
        console.log('Number:', number);
        return number;
    } else {
        console.log('Number not found');
    }
    throw new Error('Expected number');
};

export { readingTimeRegex }