import instatouch from 'instatouch';
import epochNow from '../epochNow.js';
const instaPostWrapper = async (username) => {
  try {
    const fetchProfile = await instatouch.user(username, { count: 9999999 });
    const data = {
      username: username,
      fetchAt: epochNow(),
      postCount: fetchProfile.count,
      posts: [],
    };
    for (let index = 0; index < fetchProfile.collector.length; index++) {
      const collector = fetchProfile.collector[index];
      const sc = collector.shortcode;
      const url = `https://www.instagram.com/p/${sc}/`;
      const eachPost = {
        id: collector.id,
        shortcode: sc,
        url: url,
      };
      data.posts.push(eachPost);
    }
    return data;
  } catch (error) {
    return error;
  }
};
export default instaPostWrapper;
