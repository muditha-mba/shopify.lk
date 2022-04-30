exports.setFirstLetterCapital = (word) => {
  const firstLetter = word[0].toUpperCase();
  const others = word.slice(1);
  const firstLetterCapitalWord = firstLetter.concat("", others);
  return firstLetterCapitalWord;
};
