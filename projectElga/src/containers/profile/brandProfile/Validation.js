import Verify from "../../../constants/Verify";

export const validate = (title, description, url) => {

  let errors = "";
  // if (!title) {
  //   errors = Verify.VERIFY_TITLE;
  //   return errors;
  // }
  if (!description) {
    errors = Verify.VERIFY_DESCRIPTION;
    return errors;
  }
  if (!url) {
    errors = Verify.VERIFY_URL;
    return errors;
  }

  return errors;
};


