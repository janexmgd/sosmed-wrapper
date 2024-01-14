import client from '../helper/client.js';
import { createCipheriv } from 'node:crypto';
const createXttParams = (params) => {
  try {
    const cipher = createCipheriv(
      'aes-128-cbc',
      'webapp1.0+202106',
      'webapp1.0+202106'
    );
    return Buffer.concat([cipher.update(params), cipher.final()]).toString(
      'base64'
    );
  } catch (error) {
    console.log('error when create xttpparms');
  }
};
const _defaultApiParams = {
  aid: '1988',
  count: 30,
  secUid: null,
  cursor: 0,
  cookie_enabled: true,
  screen_width: 0,
  screen_height: 0,
  browser_language: '',
  browser_platform: '',
  browser_name: '',
  browser_version: '',
  browser_online: '',
  timezone_name: 'Europe/London',
};
const musicallyHeader = {
  'User-Agent':
    'com.zhiliaoapp.musically/2022405010 (Linux; U; Android 7.1.2; en; ASUS_Z01QD; Build/N2G48H;tt-ok/3.12.13.1)',
};

// fixed https://github.com/davidteather/TikTok-Api/blob/main/TikTokApi/api/video.py
const getAccountJsonInfo = async (username) => {
  try {
    const base_url = `https://www.tiktok.com/@${username}`;
    const response = await client({
      url: base_url,
      method: 'GET',
      headers:
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
    });
    // const html = res.data;
    const start = response.data.indexOf(
      '<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__" type="application/json">'
    );

    if (start === -1) {
      throw new Error('TikTok returned an invalid response.');
    }

    const end = response.data.indexOf('</script>', start);

    if (end === -1) {
      throw new Error('TikTok returned an invalid response');
    }

    const jsonData = response.data.slice(
      start +
        '<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__" type="application/json">'
          .length,
      end
    );
    const data = JSON.parse(jsonData);
    if (data) {
      console.log('found json account');
    }
    const defaultScope = data.__DEFAULT_SCOPE__;
    const userDetail = defaultScope['webapp.user-detail'];
    const user = userDetail.userInfo.user;
    const userInfo = {
      id: user.id,
      username: user.uniqueId,
      nickname: user.nickname,
      secUid: user.secUid,
    };
    console.log(userInfo);
    return userInfo;
  } catch (error) {
    return error;
  }
};
const getUserFeed = async (secUid, count, cursor) => {
  try {
    const param = {
      ..._defaultApiParams,
      secUid: secUid,
      cursor: cursor,
      count: count,
      is_encryption: 1,
    };

    delete client.defaults.headers;
    const xTTParams = createXttParams(new URLSearchParams(param).toString());
    const res = await client({
      url: 'https://www.tiktok.com/api/post/item_list/?aid=1988&app_language=en&app_name=tiktok_web&battery_info=1&browser_language=en-US&browser_name=Mozilla&browser_online=true&browser_platform=Win32&browser_version=5.0%20%28Windows%20NT%2010.0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F107.0.0.0%20Safari%2F537.36%20Edg%2F107.0.1418.35&channel=tiktok_web&cookie_enabled=true&device_id=7002566096994190854&device_platform=web_pc&focus_state=false&from_page=user&history_len=3&is_fullscreen=false&is_page_visible=true&os=windows&priority_region=RO&referer=https%3A%2F%2Fexportcomments.com%2F&region=RO&root_referer=https%3A%2F%2Fexportcomments.com%2F&screen_height=1440&screen_width=2560&tz_name=Europe%2FBucharest&verifyFp=verify_lacphy8d_z2ux9idt_xdmu_4gKb_9nng_NNTTTvsFS8ao&webcast_language=en&msToken=7UfjxOYL5mVC8QFOKQRhmLR3pCjoxewuwxtfFIcPweqC05Q6C_qjW-5Ba6_fE5-fkZc0wkLSWaaesA4CZ0LAqRrXSL8b88jGvEjbZPwLIPnHeyQq6VifzyKf5oGCQNw_W4Xq12Q-8KCuyiKGLOw=&X-Bogus=DFSzswVL-XGANHVWS0OnS2XyYJUm',
      headers: {
        ...musicallyHeader,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35',
        'x-tt-params': xTTParams,
      },
    });
    // if (res.data) {
    //   console.log('found user feed');
    // }
    // console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const tiktokFeed = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userInfo = await getAccountJsonInfo(username);
      // return console.log(userInfo);
      let cursor = 0;
      let hasMore = true;
      const postList = [];
      while (hasMore) {
        // console.log('start scrap user feed');
        const secUid = userInfo.secUid;
        const data = await getUserFeed(secUid, 30, cursor);
        if (!data.itemList) {
          console.log('failed');
          throw new Error('tiktok not returned data');
        }
        for (const key in data.itemList) {
          const item = data.itemList[key];
          hasMore = data.hasMore;
          cursor = data.cursor;
          // console.log('hasMore == ' + hasMore);
          // console.log('cursor == ' + cursor);
          const post = {
            id: item.id,
            author: item.author.uniqueId,
            desc: item.desc,
            createTime: item.createTime,
            url: `https://www.tiktok.com/@${userInfo.username}/video/${item.id}`,
          };
          postList.push(post);
        }
      }
      const userData = {
        ...userInfo,
        feedLength: postList.length,
        feedList: postList,
      };
      console.log(userData);

      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};
export default tiktokFeed;
// tiktokFeed('jkt48.indira.s');
// getUserFeed(
//   'MS4wLjABAAAAiIR3Nw-_Bnj0WkOr-aSOeCA-9ZJtx3hnI-7rkhAut_85NPoAFMoGm62FrIrNk0MX',
//   30,
//   0
// );
