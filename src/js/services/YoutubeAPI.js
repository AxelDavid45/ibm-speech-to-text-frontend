'use strict'
const URL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=:1';
const KEY = 'AIzaSyCNWIjYtQeEU-LjLWnRYa28GT7G91b7hL8'
class YoutubeAPI {
  async retrieveVideos(query) {
    try {
      const url = URL.replace(':1',query);
      const finalUrl = `${url}&key=${KEY}`;
      const request = await fetch(finalUrl);
      return await request.json();
    } catch (err) {
      console.log(err);
    }
  }
}

export default YoutubeAPI;
