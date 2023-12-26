import axios from 'axios';
(async () => {
  try {
    console.clear();
    const username = 'jkt48.indira.s';
    const r = await axios.get(
      `http://localhost:9876/tiktok/user-info?username=${username}`
    );
    console.log(r.data);
  } catch (error) {
    console.log(error.response.data);
  }
})();
