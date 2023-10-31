import axios from 'axios';
(async () => {
  try {
    const username = 'jkt48.indira.s';
    const { data } = await axios.post('http://localhost:9876/feed/tiktok', {
      username: username,
    });
    console.log(data.data.feedList);
  } catch (error) {
    console.log(error);
  }
})();
