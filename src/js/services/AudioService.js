const URL_API = 'https://ibm-challenge-backend.herokuapp.com/'

class AudioService {
	async upload (file) {
		const url = `${URL_API}upload/`
		const headers = new Headers({
			'Content-Type': 'multipart/form-data',
		});
		const data = new FormData()

		data.append('speech', file);

		const request = await fetch(url, {
			method: 'post',
			headers: headers,
			body: data,
			redirect: 'follow'
		});
		console.log(request);
	}
}

export default AudioService
