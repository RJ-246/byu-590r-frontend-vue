import axios from "axios"
import API_URL from "./env"
import authHeader from "./auth-header"

class ActorService {
	getActors() {
		return axios
			.get(API_URL + "actors", { headers: authHeader() })
			.then((response) => {
				return response.data.data
			})
	}

	createActor(actor) {
		let formData = new FormData()
		formData.append("name", actor.name)
		formData.append("birthdate", actor.birthdate)
		formData.append("phone", actor.phone)
		return axios
			.post(API_URL + "actors", formData, {
				headers: authHeader()
			})
			.then((response) => {
				return response.data.data
			})
	}

	updateActor(actor) {
		return axios
			.put(API_URL + "actors/" + actor.id, actor, {
				headers: authHeader()
			})
			.then((response) => {
				return response.data.data
			})
	}

	deleteActor(actor) {
		return axios
			.delete(API_URL + "actor/" + actor.id, {
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

const actorService = new ActorService()
export default actorService
