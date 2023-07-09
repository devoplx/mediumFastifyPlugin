'use strict';

const readingTimeRegex = (readingTime) => {
  const numberRegex = /\d+/;
  const numberMatch = readingTime.match(numberRegex);
  let number;
  if (numberMatch) {
    number = parseInt(numberMatch[0], 10);
    console.log("Number:", number);
  } else {
    console.log("Number not found");
  }
  if (typeof number !== "number") {
    return new Error("expected number");
  }
  return number;
};

exports.readingTimeRegex = readingTimeRegex;
