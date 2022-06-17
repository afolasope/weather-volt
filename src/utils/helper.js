const topCites = [
  'Beijing',
  'Buenos Aires',
  'Cairo',
  'Chongqing',
  'Dhaka',
  'Delhi',
  'Karachi',
  'Mexico City',
  'Mumbai',
  'New York',
  'Osaka',
  'Seoul',
  'Sao Paulo',
  'Shanghai',
  'Tokyo',
];
export default topCites;

export const getLocalStorage = (localInfo) => {
  if (localInfo) {
    return localInfo;
  } else {
    return [];
  }
};
