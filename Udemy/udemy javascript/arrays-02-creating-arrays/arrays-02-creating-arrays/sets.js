// const ids = new Set([1, 2, 3, 4]);
// console.log(ids.has(1));

const person1 = { name: "manuel" };
const person2 = { name: "max" };

const personData = new Map([[person1, [{ date: "yesterday", age: "30" }]]]);

personData.set(person2, [{ date: "yesterday", age: 29 }]);

console.log(personData);
console.log(personData.get(person1));
console.log(personData.get(person2));
