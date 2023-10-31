import { TwitterDL } from 'twitter-downloader';
const xTwitterUrldirect = (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await TwitterDL(url);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
export default xTwitterUrldirect;
