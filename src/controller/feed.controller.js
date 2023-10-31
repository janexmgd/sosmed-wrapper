import response from '../helper/response.js';
import tiktokFeed from '../service/tiktokFeed.js';

const { success, failed } = response;

const feedController = {
  tiktok: async (req, res, next) => {
    try {
      const { username } = req.body;
      if (!username) {
        throw new Error('no username provided');
      }
      const data = await tiktokFeed(username);
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
export default feedController;
