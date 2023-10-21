import IgDL from '@sasmeee/igdl';

// const i = async (url) => {};
const instaWrapper = (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await IgDL(url);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
export default instaWrapper;
