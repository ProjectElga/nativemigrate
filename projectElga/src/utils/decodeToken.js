const decodeToken = (token) => {
  console.log("token>>",token)
  try {
    let temp = token.replace("%5B", "[");
    let final_token = temp.replace("%5D", "]");
    return final_token
  } catch (e) {
    console.log("decodeError", e);
  }
};
export default decodeToken;
