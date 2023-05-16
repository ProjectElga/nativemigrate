const ConvertDistance = (distance,name) => {
  if (distance > 500) {
    return "500+ km away";
  }
  if (distance === 0) {
    return "Within 1 km";
  }
  return "Within " + distance + " kms";
};
export default ConvertDistance;
