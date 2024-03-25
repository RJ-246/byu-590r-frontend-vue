import movieService from "../services/movie.service"

const initialState = { moviesList: [] }

export const movies = {
	namespaced: true,
	state: initialState,
	actions: {
		getMovies({ commit }) {
			return movieService.getMovies().then(
				(movies) => {
					commit("setMovies", movies)
					return Promise.resolve(movies)
				},
				(response) => {
					return Promise.resolve(response)
				}
			)
		},
		createMovie({ commit }, movie) {
			return movieService.createMovie(movie).then((response) => {
				commit("addMovie", response.movie)
				return Promise.resolve(response.movie)
			})
		},
		updateMovie({ commit, getters }, movie) {
			return movieService.updateMovie(movie).then((response) => {
				response.movie.index = getters.getMovieStateIndexByMovieID(
					response.movie.id
				)
				commit("setMovie", response.movie)
				return Promise.resolve(response.movie)
			})
		},
		deleteMovie({ commit, getters }, movie) {
			return movieService.deleteMovie(movie).then((response) => {
				response.movie.index = getters.getMovieStateIndexByMovieID(
					response.movie.id
				)
				commit("removeMovie", response.movie)
				return Promise.resolve(response.movie)
			})
		},
		updateMoviePicture({ commit, getters }, movie) {
			return movieService.updateMoviePicture(movie).then((response) => {
				response.movie.index = getters.getMovieStateIndexByMovieID(
					response.movie.id
				)
				commit("updateMoviePicture", response.movie)
				return Promise.resolve(response.movie)
			})
		}
	},
	mutations: {
		setMovies(state, movies) {
			state.moviesList = movies
			console.log("set Movie statelist", state.moviesList[0])
		},
		addMovie(state, movie) {
			state.moviesList.push(movie)
		},
		setMovie(state, movie) {
			state.moviesList[movie.index] = movie
		},
		removeMovie(state, movie) {
			console.log(movie.index)
			state.moviesList.splice(movie.index, 1)
		},
		updateMoviePicture(state, movie) {
			state.moviesList[movie.index].picture = movie.picture
		}
	},
	getters: {
		getMovieStateIndexByMovieID: (state) => (movieID) => {
			return state.moviesList.findIndex((movie) => {
				return movie.id === Number(movieID)
			})
		}
	}
}
