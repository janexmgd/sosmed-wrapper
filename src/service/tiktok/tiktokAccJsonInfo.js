import client from '../../helper/client.js';

// fixed https://github.com/davidteather/TikTok-Api/blob/main/TikTokApi/api/video.py
const getAccountJsonInfo = async (username) => {
  try {
    const base_url = `https://www.tiktok.com/@${username}`;
    const response = await client({
      url: base_url,
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
      },
    });

    const start = response.data.indexOf(
      '<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__" type="application/json">'
    );
    const end = response.data.indexOf('</script>', start);

    if (start === -1 || end === -1) {
      throw {
        code: 500,
        message: 'Tiktok returned invalid response',
      };
    }

    const jsonData = response.data.slice(
      start +
        '<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__" type="application/json">'
          .length,
      end
    );
    const data = JSON.parse(jsonData);
    const user = data.__DEFAULT_SCOPE__['webapp.user-detail'].userInfo.user;
    const userInfo = {
      id: user.id,
      avatar: user.avatarLarger,
      uniqueId: user.uniqueId,
      nickname: user.nickname,
      secUid: user.secUid,
    };
    return userInfo;
  } catch (error) {
    console.error(error.message);
    return error;
  }
};

export default getAccountJsonInfo;
