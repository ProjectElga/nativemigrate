const removeQoutesFromToken = (token) => {
  return token?.includes('"') ? token.substr(1, token.length - 2) : token;
};
export default removeQoutesFromToken;
