import axios from "axios"
import API_URL from "./env"
import authHeader from "./auth-header"

class DirectorService {
	getDirectors() {
		return axios
			.get(API_URL + "directors", { headers: authHeader() })
			.then((response) => {
				return response.data.data
			})
	}

	createDirector(director) {
		let formData = new FormData()
		formData.append("name", director.name)
		formData.append("birthdate", director.birthdate)
		formData.append("phone", director.phone)
		return axios
			.post(API_URL + "directors", formData, {
				headers: authHeader()
			})
			.then((response) => {
				return response.data.data
			})
	}

	updateDirector(director) {
		return axios
			.put(API_URL + "directors/" + director.id, director, {
				headers: authHeader()
			})
			.then((response) => {
				return response.data.data
			})
	}

	deleteDirector(director) {
		return axios
			.delete(API_URL + "director/" + director.id, {
				headers: authHeader()
			})
			.then((response) => {
				return response.data.data
			})
	}

	// updateMoviePicture(movie) {
	// 	let formData = new FormData()
	// 	formData.append("picture", movie.picture)
	// 	return axios
	// 		.post(
	// 			API_URL + "movies/" + movie.id + "/update_movie_picture",
	// 			formData,
	// 			{
	// 				headers: authHeader("multipart")
	// 			}
	// 		)
	// 		.then((response) => {
	// 			return response.data.data
	// 		})
	// }
}

const directorService = new DirectorService()
export default directorService
