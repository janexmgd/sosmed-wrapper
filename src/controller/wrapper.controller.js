import response from '../helper/response.js';
import tiktokWrapper from '../helper/wrapper/tiktokWrapper.js';
import GoogleDrive from '../helper/googleDrive.js';
import instaWrapper from '../helper/wrapper/instaWrapper.js';
import xWrapper from '../helper/wrapper/xWrapper.js';
const { uploadGD, readerGD, deleteGD } = GoogleDrive;
const { success, failed } = response;
const wrapperController = {
  tiktokSingle: async (req, res, next) => {
    try {
      const { url } = req.body;
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
      const { url } = req.body;
      if (!url) {
        throw new Error('no url provided');
      }
      const data = await instaWrapper(url);
      if (!data) {
        throw new Error('invalid url');
      }
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
      const { url } = req.body;
      if (!url) {
        throw new Error('no url provided');
      }
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
