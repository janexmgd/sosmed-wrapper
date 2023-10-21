import IgDL from '@sasmeee/igdl';

// const i = async (url) => {};
const instaWrapper = (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const url =
      //   'https://www.instagram.com/p/CybJZkLLWur/?utm_source=ig_web_copy_link';
      const data = await IgDL(url);
      console.log(data);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
// instaWrapper(
//   'https://www.instagram.com/p/CybJZkLLWur/?utm_source=ig_web_copy_link'
// );
export default instaWrapper;
