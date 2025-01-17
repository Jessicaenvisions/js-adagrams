export const updatingHashTable = (score, word, hashTableUpdating) => {
  hashTableUpdating["score"] = score;
  hashTableUpdating["word"] = word;
  return hashTableUpdating;
};

export const drawLetters = () => {
  const letterPool = {
    A: 9,
    B: 2,
    C: 2,
    D: 4,
    E: 12,
    F: 2,
    G: 3,
    H: 2,
    I: 9,
    J: 1,
    K: 1,
    L: 4,
    M: 2,
    N: 6,
    O: 8,
    P: 2,
    Q: 1,
    R: 6,
    S: 4,
    T: 6,
    U: 4,
    V: 2,
    W: 2,
    X: 1,
    Y: 2,
    Z: 1,
  };
  let allLetters = "";
  for (let letter in letterPool) {
    const amountOfTimes = letterPool[letter];
    for (let i = 0; i < amountOfTimes; i++) {
      allLetters += letter;
    }
  }
  let drawnletters = [];
  for (let i = 0; i < 10; i++) {
    let randomLetter = allLetters.charAt(
      Math.floor(Math.random() * allLetters.length)
    );
    allLetters = allLetters.replace(randomLetter, "");
    drawnletters.push(randomLetter);
  }
  return drawnletters;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  let arrayOfInputValues = Array.from(input);
  let allLettersInHand = "";
  for (let letter of lettersInHand) {
    allLettersInHand += letter;
  }
  for (let i = 0; i < arrayOfInputValues.length; i++) {
    let isStringValid = allLettersInHand.includes(arrayOfInputValues[i]);
    if (isStringValid === true) {
      allLettersInHand = allLettersInHand.replace(arrayOfInputValues[i], "");
    } else {
      return false;
    }
  }
  return true;
};

export const scoreWord = (word) => {
  const valueOfLetter = {
    A: 1,
    B: 3,
    C: 3,
    D: 2,
    E: 1,
    F: 4,
    G: 2,
    H: 4,
    I: 1,
    J: 8,
    K: 5,
    L: 1,
    M: 3,
    N: 1,
    O: 1,
    P: 3,
    Q: 10,
    R: 1,
    S: 1,
    T: 1,
    U: 1,
    V: 4,
    W: 4,
    X: 8,
    Y: 4,
    Z: 10,
  };
  let score = 0;
  word = word.toUpperCase();
  if (word.length >= 7) {
    score += 8;
  }
  word = word.trim();
  for (let letter of word) {
    score += valueOfLetter[letter];
  }
  return score;
};

export const highestScoreFrom = (words) => {
  let scoreInfo = [];

  for (let oneWord of words) {
    let infoAboutWords = new Object();
    let score = scoreWord(oneWord);
    infoAboutWords = updatingHashTable(score, oneWord, infoAboutWords);
    scoreInfo.push(infoAboutWords);
  }

  let highestScoreInfo = new Object();

  for (let Index = 0; Index < scoreInfo.length; Index++) {
    if (Index === 0) {
      highestScoreInfo = updatingHashTable(
        scoreInfo[Index]["score"],
        scoreInfo[Index]["word"],
        highestScoreInfo
      );
    } else if (highestScoreInfo["score"] > scoreInfo[Index]["score"]) {
      break;
    } else if (highestScoreInfo["score"] < scoreInfo[Index]["score"]) {
      highestScoreInfo = updatingHashTable(
        scoreInfo[Index]["score"],
        scoreInfo[Index]["word"],
        highestScoreInfo
      );
    } else if (highestScoreInfo["score"] === scoreInfo[Index]["score"]) {
      let highestScoreInfoWord = highestScoreInfo["word"];
      let highestScoreInfoWordLength = highestScoreInfoWord.length;
      let scoreInfoWord = scoreInfo[Index]["word"];
      let scoreInfoWordLength = scoreInfoWord.length;
      if (highestScoreInfoWordLength === 10 && scoreInfoWordLength == 10) {
        break;
      } else if (highestScoreInfoWordLength === 10) {
        break;
      } else if (scoreInfoWordLength === 10) {
        highestScoreInfo = updatingHashTable(
          scoreInfo[Index]["score"],
          scoreInfo[Index]["word"],
          highestScoreInfo
        );
      } else if (
        scoreInfoWordLength !== 10 &&
        scoreInfoWordLength < highestScoreInfoWordLength &&
        scoreInfoWordLength !== 10
      ) {
        highestScoreInfo = updatingHashTable(
          scoreInfo[Index]["score"],
          scoreInfo[Index]["word"],
          highestScoreInfo
        );
      }
    }
  }
  return highestScoreInfo;
};
