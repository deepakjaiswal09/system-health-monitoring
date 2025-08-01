function getRandomValue(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function doSomeHeavyTask() {
  const ms = getRandomValue([100, 150, 200, 300, 600, 500, 1000, 1400, 2500]);
  const shouldThrowError = getRandomValue([1, 2, 3, 4, 5, 6, 7, 8]) === 8;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldThrowError) {
        const randomError = getRandomValue([
          "DB Payment Failure",
          "DB Server is Down",
          "Access Denied",
          "Not Found Error",
        ]);
        reject(new Error(randomError));
      } else {
        resolve(`Task completed in ${ms}ms`);
      }
    }, ms);
  });
}

module.exports = { doSomeHeavyTask };
