import axios from 'axios';
(async () => {
  try {
    const xurl =
      'https://twitter.com/SP_IndiraJKT48/status/1718561874986631340';
    const { data } = await axios.post('http://localhost:9876/dl/x', {
      url: xurl,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
})();
