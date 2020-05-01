const userRanks = [
  ``, `Novice`, `Fan`, `Movie Buff`
];

const generateUserProfile = () => {
  return {
    rank: userRanks[Math.floor(Math.random() * userRanks.length)],
    avatar: `./images/bitmap@2x.png`
  };
};

export {generateUserProfile};
