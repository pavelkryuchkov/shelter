function getRandomCard() {
  return Math.floor(Math.random() * 8);
}

function getRandomCards(n, except = []) {
  const res = [];
  while (res.length < n) {
    const num = getRandomCard();
    if (!res.includes(num) && !except.includes(num)) {
      res.push(num);
    }
  }
  return res;
}

function getPaginationCards() {
  let res = [];
  for (let i = 0; i < 2; i++) {
    res = res.concat(getRandomCards(8));
    res = res.concat(getRandomCards(4, res.slice(-2)));
    res = res.concat(getRandomCards(4, res.slice(-4)));
    res = res.concat(getRandomCards(2, res.slice(-4)));
    res = res.concat(getRandomCards(6, res.slice(-2)));
  }
  return res;
}

// let array = getPaginationCards();
// print(array);
// console.log(test(array));
// console.log([1, 2, 3, 4, 5].slice(-2));

function print(array) {
  console.log(array);
  for (let i = 0; i < array.length / 8; i++) {
    console.log(array.slice(i * 8, (i + 1) * 8));
  }
  for (let i = 0; i < array.length / 6; i++) {
    console.log(array.slice(i * 6, (i + 1) * 6));
  }
}

function test(array) {
  for (let i = 0; i < array.length / 8; i++) {
    if (new Set(array.slice(i * 8, (i + 1) * 8)).size !== 8) {
      console.log(i + 1, array.slice(i * 8, (i + 1) * 8));
      return false;
    }
  }
  for (let i = 0; i < array.length / 6; i++) {
    if (new Set(array.slice(i * 6, (i + 1) * 6)).size !== 6) {
      console.log(i + 1, array.slice(i * 6, (i + 1) * 6));
      return false;
    }
  }
  return true;
}

for (let i = 0; i < 100; i++) {
  console.log(`Тест № ${i + 1}`);
  let array = getPaginationCards();
  if (!test(array)) {
    print(array);
    break;
  }
}
