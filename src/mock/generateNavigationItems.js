const navigationItemNames = [
  `Watchlist`, `History`, `Favorites`
];

const generateNavigation = () => {
  return navigationItemNames.map((it) => {
    return {
      name: it,
      href: it.toLowerCase(),
      count: Math.floor(Math.random() * 100)
    };
  });
};

export {generateNavigation};
