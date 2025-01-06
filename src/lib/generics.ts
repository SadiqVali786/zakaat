// ##############################################################
// function convertToArray<T>(input: T): T[] {
//   return [input];
// }
const convertToArray = <T>(input: T): T[] => [input];

convertToArray("Sadiq");
convertToArray(5);
convertToArray(true);
convertToArray({ name: "Sadiq", age: 32 });

// ##############################################################
// function getIndexOfArrayItem<T>(array: T[], arrayItem: T) {
//   return array.findIndex((item) => item === arrayItem);
// }
const getIndexOfArrayItem = <T>(array: T[], arrayItem: T): number =>
  array.findIndex((item) => item === arrayItem);

getIndexOfArrayItem([55, 99, 77], 77);
getIndexOfArrayItem(["Sadiq", "Vali", "77"], "Vali");
getIndexOfArrayItem([true, false], false);

// ##############################################################
// function createArrayPair<T, K>(input1: T, input2: K): [T, K] {
//   return [input1, input2];
// }
type Props<T, K> = {
  input1: T;
  input2: K;
};
const createArrayPair = <T, K>({ input1, input2 }: Props<T, K>): [T, K] => [
  input1,
  input2,
];

createArrayPair({ input1: "hello", input2: 10 });

// ##############################################################
const convertToArray2 = <T extends number | string>(input: T): T[] => [input];
convertToArray2("Sadiq");
convertToArray2(5);
// convertToArray2(true);
// convertToArray2({ name: "Sadiq", age: 32 });
