import instatouch from 'instatouch';
import randUserAgent from 'rand-user-agent';
import epochNow from '../epochNow.js';
const agent = randUserAgent('desktop');
const fetcher = (username) => {
  return new Promise((resolve, reject) => {
    instatouch
      .user(username, { count: 9999999, userAgent: agent })
      .then((data) => {
        if (data.auth_error == true) {
          resolve({
            error: 'true',
          });
        } else {
          resolve(data);
        }
      })
      .catch((er) => {
        reject(er);
      });
  });
};
export const postWrapper = async (username) => {
  try {
    // console.log(agent);
    const fetchProfile = await fetcher(username);
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
      console.log(`post ==> ${data.posts.length}`);
    }
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
// a('renebaebae');
