import response from '../helper/response.js';

import getAccountJsonInfo from '../service/tiktok/tiktokAccJsonInfo.js';
import tiktokFeed from '../service/tiktok/tiktokFeed.js';

const { success, failed } = response;

const tiktokController = {
  accountJsonInfo: async (req, res, next) => {
    try {
      const { username } = req.query;
      if (!username) {
        throw {
          code: 400,
          message: 'username query not found',
        };
      }
      const data = await getAccountJsonInfo(username);
      return success(res, {
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
  feedTiktok: async (req, res, next) => {
    try {
      const { secUid, cursor } = req.query;
      if (!secUid) {
        throw {
          code: 400,
          message: 'secUid query not found',
        };
      }
      if (!cursor) {
        throw {
          code: 400,
          message: 'cursor query not found',
        };
      }
      const data = await tiktokFeed(secUid, cursor);
      return success(res, {
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
