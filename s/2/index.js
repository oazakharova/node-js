"use strict";

const { calculateResultSum } = require("./calculateResultSum");

const total = calculateResultSum([12.1, 32.2, 43.1], 0.9);

console.log(`Общая стоимость покупок составляет ${total} рублей`);
