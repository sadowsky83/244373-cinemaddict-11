const sortItemNames = [
  `Sort by default`, `Sort by date`, `Sort by rating`
];

const generateSortItems = () => {
  return sortItemNames.map((it) => {
    return {
      name: it,
      href: `#`
    };
  });
};

export {generateSortItems};
