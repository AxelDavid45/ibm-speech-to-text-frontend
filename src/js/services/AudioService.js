const URL_API = 'https://ibm-challenge-backend.herokuapp.com/'

class AudioService {
	async upload (file) {
		const url = `${URL_API}upload/`
		const data = new FormData()
		data.append('speech', file)
		try {
			const request = await fetch(url, {
				method: 'POST',
				body: data,
				mode: 'cors'
			});
			return await request.json();
		} catch (err) {
			console.log(err);
		}
	}

	async retrieveResult(id) {
		const url = `${URL_API}status/${id}`
		try {
			const request = await fetch(url, {
				method: 'GET',
				mode: 'cors'
			});
			return await request.json();
		} catch (err) {
			console.log(err);
		}
	}
}

export default AudioService
