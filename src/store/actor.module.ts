import actorService from "../services/actor.service"

const initialState = { actorsList: [] }

export const actors = {
	namespaced: true,
	state: initialState,
	actions: {
		getActors({ commit }) {
			return actorService.getActors().then(
				(actors) => {
					commit("setActors", actors)
					return Promise.resolve(actors)
				},
				(response) => {
					return Promise.resolve(response)
				}
			)
		},
		createActor({ commit }, actor) {
			return actorService.createActor(actor).then((response) => {
				commit("addActor", response.actor)
				return Promise.resolve(response.actor)
			})
		}
		// updateActor({ commit, getters }, actor {
		// 	return actorService.updateActor(actor).then((response) => {
		// 		response.actor.index = getters.getMovieStateIndexByMovieID(
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
		setActors(state, actors) {
			state.actorsList = actors
			console.log("set Actor statelist", state.actorsList)
		},
		addActor(state, actor) {
			state.actorsList.push(actor)
			console.log(state.actorsList)
		},
		setActor(state, actor) {
			state.actorsList[actor.index] = actor
		},
		removeActor(state, actor) {
			console.log(actor.index)
			state.actorList.splice(actor.index, 1)
		}
		// updateMoviePicture(state, movie) {
		// 	state.moviesList[movie.index].picture = movie.picture
		// }
	},
	getters: {
		getActorStateIndexByActorID: (state) => (actorID) => {
			return state.actorsList.findIndex((actor) => {
				return actor.id === Number(actorID)
			})
		}
	}
}
