import axios from 'axios';
(async () => {
  try {
    const igurl = 'https://www.instagram.com/p/Cy6GCRWPhmD';
    const { data } = await axios.post('http://localhost:9876/dl/instagram', {
      url: igurl,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
})();
