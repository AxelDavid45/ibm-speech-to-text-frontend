const URL_API = 'https://ibm-challenge-backend.herokuapp.com/'
class AnalyzerService {
  async analyze(payload = {}) {
    const url = `${URL_API}analyze`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: payload,
        mode: 'cors'
      })
      return await response.json()
    } catch(err) {
      console.log(err);
    }
  }
}
export default AnalyzerService;
