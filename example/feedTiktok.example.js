import axios from 'axios';
(async () => {
  try {
    const username = 'jkt48.indira.s';
    const base_url = 'https://long-gold-crab-cuff.cyclic.app';
    const { data } = await axios.post(`${base_url}/feed/tiktok`, {
      username: username,
    });
    console.log(data.data.feedList);
  } catch (error) {
    console.log(error);
  }
})();
