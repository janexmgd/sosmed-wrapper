import axios from 'axios';
(async () => {
  try {
    const username = 'jkt48.indira.s';
    const { data } = await axios.get(
      `http://localhost:9876/tiktok?username=${username}`
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
})();
