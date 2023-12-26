import response from '../helper/response.js';

import getAccountJsonInfo from '../service/tiktok/tiktokAccJsonInfo.js';

const { success, failed } = response;

const tiktokController = {
  accountJsonInfo: async (req, res, next) => {
    try {
      const { username } = req.query;
      if (!username) {
        throw new Error('no username provided');
      }
      const data = await getAccountJsonInfo(username);
      success(res, {
        code: 200,
        status: 'success',
        message: 'Success get data',
        data: data,
      });
    } catch (error) {
      return failed(res, {
        code: error.code || 500,
        status: 'error' || 'failed',
        message: error.message || 'internal server error',
      });
    }
  },
};
export default tiktokController;
