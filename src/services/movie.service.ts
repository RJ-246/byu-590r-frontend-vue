import axios from "axios"
import API_URL from "./env"
import authHeader from "./auth-header"

class MovieService {
	getMovies() {
		return axios
			.get(API_URL + "movies", { headers: authHeader() })
			.then((response) => {
				return response.data.data
			})
	}

	createMovie(movie) {
		let formData = new FormData()
		formData.append("picture", movie.picture)
		formData.append("title", movie.title)
		formData.append("description", movie.description)
		formData.append("year_released", movie.year_released)
		formData.append("director_id", movie.director_id)
		formData.append("actors", movie.actors)
		return axios
			.post(API_URL + "movies", formData, {
				headers: authHeader("multipart")
			})
			.then((response) => {
				return response.data.data
			})
	}

	updateMovie(movie) {
		return axios
			.put(API_URL + "movies/" + movie.id, movie, {
				headers: authHeader()
			})
			.then((response) => {
				return response.data.data
			})
	}

	deleteMovie(movie) {
		return axios
			.delete(API_URL + "movies/" + movie.id, { headers: authHeader() })
			.then((response) => {
				return response.data.data
			})
	}

	updateMoviePicture(movie) {
		let formData = new FormData()
		formData.append("picture", movie.picture)
		return axios
			.post(
				API_URL + "movies/" + movie.id + "/update_movie_picture",
				formData,
				{
					headers: authHeader("multipart")
				}
			)
			.then((response) => {
				return response.data.data
			})
	}
}

const movieService = new MovieService()
export default movieService
