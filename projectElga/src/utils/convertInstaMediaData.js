const convertInstaMediaData = (array) =>
  array.reduce((arr, item, currentIndex) => {
    if (currentIndex < 6) {
      arr.push({
        image: item.mediaUrl,
        id: item.igMediaId,
        like: item.likeCount,
        caption: item.caption,
        mediaType: item.mediaType,
        mediaId: item.ytMediaId,
        thumbnail: item.thumbnailUrl,
        permalink: item.permalink ? item.permalink : "",
      });
    }
    return arr;
  }, []);
export default convertInstaMediaData;
