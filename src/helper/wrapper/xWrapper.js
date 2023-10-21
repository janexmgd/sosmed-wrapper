import { TwitterDL } from 'twitter-downloader';
// const i = async (url) => {};
const xWrapper = (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const url =
      //   'https://www.instagram.com/p/CybJZkLLWur/?utm_source=ig_web_copy_link';
      const data = await TwitterDL(url);
      //   console.log(data);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
// xWrapper('https://twitter.com/taeccool/status/1715637254524481657');
// xWrapper();
export default xWrapper;
