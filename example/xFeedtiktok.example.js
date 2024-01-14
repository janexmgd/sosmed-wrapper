import axios from 'axios';
(async () => {
  try {
    // const base_url = 'https://sosmed-wrapper.vercel.app';
    const base_url = 'http://localhost:9876';
    // const base_url = 'https://long-gold-crab-cuff.cyclic.app';
    const username = 'jkt48.indira.s';
    const userInfoResponse = await axios.get(
      `${base_url}/tiktok/user-info?username=${username}`
    );

    const secUid = userInfoResponse.data.data.secUid;

    let cursor = 0;
    let hasMore = true;
    const postList = [];

    while (hasMore) {
      const userFeedResponse = await axios.get(
        `${base_url}/tiktok/user-feed?secUid=${secUid}&cursor=${cursor}`
      );
      const {
        hasMore: feedHasMore,
        cursor: feedCursor,
        itemList,
      } = userFeedResponse.data.data;

      hasMore = feedHasMore;
      cursor = feedCursor;

      postList.push(...itemList);
    }
    const data = {
      id: userInfoResponse.data.data.id,
      uniqueId: userInfoResponse.data.data.uniqueId,
      nickname: userInfoResponse.data.data.nickname,
      itemLength: postList.length,
      itemList: postList,
    };

    // console.log(data.postList.length);
    console.log(data);
  } catch (error) {
    console.error(error?.response?.data);
    console.error(error?.message);
  }
})();
