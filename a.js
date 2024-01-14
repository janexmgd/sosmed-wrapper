import axios from 'axios';

(async () => {
  const url =
    'https://www.tiktok.com/api/post/item_list/?aid=1988&app_language=en&app_name=tiktok_web&battery_info=1&browser_language=en-US&browser_name=Mozilla&browser_online=true&browser_platform=Win32&browser_version=5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F107.0.0.0%20Safari%2F537.36%20Edg%2F107.0.1418.35&channel=tiktok_web&cookie_enabled=true&device_id=7002566096994190854&device_platform=web_pc&focus_state=false&from_page=user&history_len=3&is_fullscreen=false&is_page_visible=true&os=windows&priority_region=RO&referer=https%3A%2F%2Fexportcomments.com%2F&region=RO&root_referer=https%3A%2F%2Fexportcomments.com%2F&screen_height=1440&screen_width=2560&tz_name=Europe%2FBucharest&verifyFp=verify_lacphy8d_z2ux9idt_xdmu_4gKb_9nng_NNTTTvsFS8ao&webcast_language=en&msToken=7UfjxOYL5mVC8QFOKQRhmLR3pCjoxewuwxtfFIcPweqC05Q6C_qjW-5Ba6_fE5-fkZc0wkLSWaaesA4CZ0LAqRrXSL8b88jGvEjbZPwLIPnHeyQq6VifzyKf5oGCQNw_W4Xq12Q-8KCuyiKGLOw=&X-Bogus=DFSzswVL-XGANHVWS0OnS2XyYJUm';
  try {
    const r = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35',
        Cookie:
          'msToken=myQOZsZS0oStNYbu4UFtHofRutdmj9hC07afEnKMGpYDkLcf1EomvIh_v9soXXLZ3ouoqN_RxSeNbSATsPdBMl4g3plqhpsZrrDOX-dKmK-Qbch5-hQhh00yTk0SAKb-TxSzrCjFwvx46rI=;ttwid=1%7CMS7UykpvZ7GZGJ_A6zmmm4Ezc8OH1SetvsjkQ7O1TaI%7C1705217839%7C07cce37b68c729024fb3797fbfef1c4109850fbbb31fe68bd7ae71df10038554;perf_feed_cache={%22expireTimestamp%22:1705388400000%2C%22itemIds%22:[%227290942038466465067%22%2C%227306225973555383557%22%2C%227313226415204240646%22]};passport_csrf_token_default=729bcb40f0b95c2c77e712a58a052ded;msToken=j2zgEnx7BAONYrE2yTs_3UUFMrEASy704YNpHgPbfZJ7kA_Q9NTvVCoBz5ScNmseoBJb2Fg-4Ghp6vinBEbIQd8oFfW3JDQDp2zUgrfkEeOcAcYN7LPXXzM7Zg6n1ROTzgv8jEyj9KBP238=;s_v_web_id=verify_lrd56yih_379IIv05_KRXb_4OXh_90a9_0dOAaJQ3OtJ7;tiktok_webapp_theme=light;odin_tt=3051928c2b7297afdb25334527506b047650f59223a2c683d06c612980f18e774fdc4c0281ec00e106ee58b27a545cb88ba969c718d77c20e46045b2d8ea7b8ff124af5bded0d80a93c7a954d9a878ec;passport_csrf_token=729bcb40f0b95c2c77e712a58a052ded;tt_chain_token=MmAG/tsI0wjgBauSvcE6bg==;tt_csrf_token=I1PWSlla-MuXXX2qf9z2_U4b6KrrIAnymgKM',
      },
    });
    console.log(r);
  } catch (error) {
    console.log(error);
  }
})();
