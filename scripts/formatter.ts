exports.format = (messages) => {
  const results = {};

  Object.entries(messages).forEach(([id, { defaultMessage }]) => results[id] = defaultMessage);

  return results;
};
