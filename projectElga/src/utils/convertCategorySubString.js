const handleSplitText = (array) => {
  const text = array
    .map(function (elem) {
        return elem.name;
    })
    .join(",");
  return fetchParticipantsSingle(text, 40);
};
const fetchParticipantsSingle = (text, limit) => {
  if (text?.length > limit) {
    return text.substring(0, limit) + "...";
  } else {
    return text;
  }
};
export default handleSplitText;