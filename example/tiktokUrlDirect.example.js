import axios from 'axios';
(async () => {
  try {
    const tturl = 'https://vt.tiktok.com/ZSYqS83B8/';
    const res = await axios.post('http://localhost:9876/dl/tiktok/single', {
      url: tturl,
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
})();
