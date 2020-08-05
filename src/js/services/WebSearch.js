const URL = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyAkO9HntmqeRtYEwNj_7qMd6c4yusGdWDY&cx=011835907953613196564:eyxj-nvckro&q=:1';
class WebSearch {
  async retrieveResults(query) {
    const url = URL.replace(':1', query);
    const request = await fetch(url);
    return await request.json();
  }
}

export default WebSearch;
