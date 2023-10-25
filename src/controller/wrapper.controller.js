import response from '../helper/response.js';
import tiktokWrapper from '../helper/wrapper/tiktokWrapper.js';
import GoogleDrive from '../helper/googleDrive.js';
import instaWrapper from '../helper/wrapper/instaWrapper.js';
import urlModule from 'url';
import xWrapper from '../helper/wrapper/xWrapper.js';
// import instaPostWrapper from '../helper/wrapper/instaPostwrapper.js';
import { postWrapper } from '../helper/wrapper/ass.js';
const { uploadGD, readerGD, deleteGD } = GoogleDrive;
const { success, failed } = response;

// regex link
const FacebookLink =
  /https:\/\/fb\.watch\/[^\s]+|https:\/\/www\.facebook\.com\/[^\s]+/g;
const wrapperController = {
  tiktokSingle: async (req, res, next) => {
    try {
      const TiktokLink =
        /(https:\/\/www\.tiktok\.com\/@[\w.-]+\/video\/\d+|https:\/\/vt\.tiktok\.com\/[\w.-]+)/g;
      const { url } = req.body;
      const isTiktokLink = url.match(TiktokLink);
      if (!isTiktokLink) {
        throw new Error('invalid tiktok URL');
      }
      const data = await tiktokWrapper(url);

      success(res, {
        code: 200,
        status: 'success',
        message: 'Success get data',
        data: data,
      });
      return;
    } catch (error) {
      return failed(res, {
        code: error.code || 500,
        status: 'error' || 'failed',
        message: error.message || 'internal server error',
      });
    }
  },
  tiktokMulti: async (req, res, next) => {
    try {
      if (req.file) {
        const fileatGD = await uploadGD(req.file);
        // console.log(fileatGD.fileId);
        const listFromGD = await readerGD(fileatGD.fileId);
        if (!listFromGD.split('\n')) {
          throw new Error('invalid list format');
        }
        const urlListSplit = listFromGD.split('\n');
        const urlList = [];
        for (const url of urlListSplit) {
          try {
            urlList.push(url);
          } catch (error) {
            console.log(error);
          }
        }
        const data = [];
        const promises = [];

        for (const url of urlList) {
          promises.push(
            tiktokWrapper(url).then((dataPerIndex) => {
              data.push(dataPerIndex);
            })
          );
        }

        await Promise.all(promises);
        await deleteGD(fileatGD.fileId);
        success(res, {
          code: 200,
          status: 'success',
          message: 'Success get data',
          data: data,
        });
      } else {
        throw new Error('need list of file');
      }
    } catch (error) {
      return failed(res, {
        code: error.code || 500,
        status: 'error' || 'failed',
        message: error.message || 'internal server error',
      });
    }
  },
  igDL: async (req, res, next) => {
    try {
      const InstaLink =
        /^https:\/\/www\.instagram\.com\/(?:p|reel)\/[A-Za-z0-9_-]+(?:\?[^/]+)?/;

      const { url } = req.body;
      if (!url) {
        throw new Error('no url provided');
      }
      const isInstaLink = url.match(InstaLink);
      if (!isInstaLink) {
        throw new Error('invalid instagram URL');
      }
      const data = await instaWrapper(url);
      let arr;

      if (data.length > 1) {
        arr = {
          isCarousel: true,
          length: data.length,
          mediaUrl: [],
        };
      } else {
        arr = {
          isCarousel: false,
          length: data.length,
          mediaUrl: [],
        };
      }
      data.forEach((element) => {
        const urlMedia = element.download_link;
        const parsedUrl = urlModule.parse(urlMedia);
        const pathnameSegments = parsedUrl.pathname.split('/');
        const filenameQuery = pathnameSegments[pathnameSegments.length - 1];
        const filename = filenameQuery.split('?')[0];
        const extensionMatch = filename.match(/\.(\w+)$/);
        if (extensionMatch) {
          const extension = extensionMatch[1];
          if (extension == 'jpg') {
            // for image
            arr.mediaUrl.push({
              type: 'image',
              url: urlMedia,
            });
          } else {
            // for video
            arr.mediaUrl.push({
              type: 'video',
              url: urlMedia,
            });
          }
        } else {
          //exception reels ig
          arr.mediaUrl.push({
            type: 'video',
            url: urlMedia,
          });
        }
      });
      if (!data) {
        throw new Error('invalid url');
      }
      success(res, {
        code: 200,
        status: 'success',
        message: 'Success get data',
        data: arr,
      });
      return;
    } catch (error) {
      return failed(res, {
        code: error.code || 500,
        status: 'error' || 'failed',
        message: error.message || 'internal server error',
      });
    }
  },
  igPost: async (req, res, next) => {
    try {
      const { username } = req.body;
      const data = await postWrapper(username);
      success(res, {
        code: 200,
        status: 'success',
        message: 'Success get data',
        data: data,
      });
      return;
    } catch (error) {
      return failed(res, {
        code: error.code || 500,
        status: 'error' || 'failed',
        message: error.message || 'internal server error',
      });
    }
  },
  xDL: async (req, res, next) => {
    try {
      const TwitterLink = /https:\/\/(www\.)?twitter\.com\/[^/]+\/status\/\d+/;

      const { url } = req.body;
      if (!url) {
        throw new Error('no url provided');
      }
      console.log(TwitterLink);
      console.log(url);
      const isTwitterLink = url.match(TwitterLink);
      if (isTwitterLink) {
        const data = await xWrapper(url);
        // console.log(data);
        if (data.status == 'error') {
          throw new Error(data.message);
        }
        success(res, {
          code: 200,
          status: 'success',
          message: 'Success get data',
          data: data.result,
        });
      } else {
        throw new Error('invalid twitter URL');
      }

      return;
    } catch (error) {
      if (
        error.message ==
        'There was an error getting twitter id. Make sure your twitter url is correct!'
      ) {
        return failed(res, {
          code: error.code || 400,
          status: 'error' || 'failed',
          message: error.message || 'internal server error',
        });
      } else {
        return failed(res, {
          code: error.code || 500,
          status: 'error' || 'failed',
          message: error.message || 'internal server error',
        });
      }
    }
  },
};
export default wrapperController;
