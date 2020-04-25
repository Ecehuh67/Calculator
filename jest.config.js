module.exports = {
  preset: `ts-jest`,
  verbose: true,
  setupFiles: [`./jest.setup.js`],
  transform: {
    "\\.tsx?$": `ts-jest`,
    "\\.js?$": `babel-jest`
  },
};

