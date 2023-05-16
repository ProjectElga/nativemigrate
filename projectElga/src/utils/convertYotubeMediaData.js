import STRINGS from "../constants/Strings";

const convertYotubeMediaData = (array) => array.reduce((arr, item) => {
  arr.push({
    video: STRINGS.YOUTUBE_VIDEO_URL + item.ytVideoId,
    id: item.ytMediaId,
    like: item.likeCount,
    view: item.viewCount,
    caption: item.title,
    mediaType: "VIDEO",
    channelId: item.ytChannelId
  });
  return arr;
}, []);
export default convertYotubeMediaData;