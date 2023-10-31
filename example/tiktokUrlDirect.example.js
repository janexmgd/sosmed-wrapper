import axios from 'axios';
(async () => {
  try {
    const tturl =
      'https://www.tiktok.com/@marsha.jkt48/video/7288733719081389318?lang=id-ID';
    const res = await axios.post('http://localhost:9876/dl/tiktok/single', {
      url: tturl,
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
})();
