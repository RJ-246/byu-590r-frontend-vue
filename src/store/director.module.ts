import directorService from "../services/director.service"

const initialState = { directorsList: [] }

export const directors = {
	namespaced: true,
	state: initialState,
	actions: {
		getDirectors({ commit }) {
			return directorService.getDirectors().then(
				(directors) => {
					commit("setDirectors", directors)
					return Promise.resolve(directors)
				},
				(response) => {
					return Promise.resolve(response)
				}
			)
		},
		createDirector({ commit }, director) {
			return directorService.createDirector(director).then((response) => {
				commit("addDirector", response.director)
				return Promise.resolve(response.director)
			})
		}
		// updateDirector({ commit, getters }, director {
		// 	return directorService.updateDirector(director).then((response) => {
		// 		response.director.index = getters.getMovieStateIndexByMovieID(
		// 			response.movie.id
		// 		)
		// 		commit("setMovie", response.movie)
		// 		return Promise.resolve(response.movie)
		// 	})
		// },
		// deleteMovie({ commit, getters }, movie) {
		// 	return movieService.deleteMovie(movie).then((response) => {
		// 		response.movie.index = getters.getMovieStateIndexByMovieID(
		// 			response.movie.id
		// 		)
		// 		commit("removeMovie", response.movie)
		// 		return Promise.resolve(response.movie)
		// 	})
		// },
		// updateMoviePicture({ commit, getters }, movie) {
		// 	return movieService.updateMoviePicture(movie).then((response) => {
		// 		response.movie.index = getters.getMovieStateIndexByMovieID(
		// 			response.movie.id
		// 		)
		// 		commit("updateMoviePicture", response.movie)
		// 		return Promise.resolve(response.movie)
		// 	})
		// }
	},
	mutations: {
		setDirectors(state, directors) {
			state.directorsList = directors
			console.log("set Director statelist", state.directorsList)
		},
		addDirector(state, director) {
			state.directorsList.push(director)
			console.log(state.directorsList)
		},
		setDirector(state, director) {
			state.directorsList[director.index] = director
		},
		removeDirector(state, director) {
			console.log(director.index)
			state.directorList.splice(director.index, 1)
		}
		// updateMoviePicture(state, movie) {
		// 	state.moviesList[movie.index].picture = movie.picture
		// }
	},
	getters: {
		getDirectorStateIndexByDirectorID: (state) => (directorID) => {
			return state.directorsList.findIndex((director) => {
				return director.id === Number(directorID)
			})
		}
	}
}
