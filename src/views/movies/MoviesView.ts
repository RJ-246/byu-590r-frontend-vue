import { mapState } from "vuex"
import { useDisplay } from "vuetify"

export default {
	name: "MoviesView",
	computed: {
		...mapState({
			movies() {
				return this.$store.state.movies.moviesList
			},
			directors() {
				return this.$store.state.directors.directorsList
			},
			actors() {
				return this.$store.state.actors.actorsList
			}
		})
	},
	data: function () {
		return {
			tab: "movie",
			directorIsLoading: true,
			actorIsLoading: true,
			movieIsLoading: true,
			movieIsUpdating: false,
			movieIsDeleting: false,
			deleteMovieErrorMessage: null,
			editMovieDialog: false,
			editFileChangeDialogBtn: false,
			deleteMovieDialog: false,
			selectedDeleteMovie: null,
			createMovieDialog: false,
			movieIsCreating: false,
			newMovieErrorMessage: null,
			newDirectorErrorMessage: null,
			newActorErrorMessage: null,
			newMovie: {
				title: "",
				description: "",
				picture: "",
				year_released: "",
				director_id: "",
				actors: []
			},
			editMovie: {},
			newDirector: {
				name: "",
				birthdate: "",
				phone: ""
			},
			newActor: {
				name: "",
				birthdate: "",
				phone: ""
			}
		}
	},
	created() {
		this.getMovies()
		this.getDirectors()
		this.getActors()
	},
	methods: {
		editSelectedMovie() {
			this.movieIsUpdating = true
			this.editMovieErrorMessage = null
			this.$store
				.dispatch("movies/updateMovie", this.editMovie)
				.then(() => {
					this.closeEditMovieDialog()
					this.movieIsUpdating = false
				})
				.catch((error) => {
					this.editMovieErrorMessage = error.response.data.data
					this.movieIsUpdating = false
				})
		},
		getMovies() {
			this.$store.dispatch("movies/getMovies").then(() => {
				this.movieIsLoading = false
			})
		},
		getDirectors() {
			this.$store.dispatch("directors/getDirectors").then(() => {
				this.directorIsLoading = false
			})
		},
		getActors() {
			this.$store.dispatch("actors/getActors").then(() => {
				this.actorIsLoading = false
			})
		},
		openDeleteMovieDialog(movie) {
			this.selectedDeleteMovie = movie
			this.deleteMovieDialog = true
		},
		openEditMovieDialog(movie) {
			this.editMovie = movie
			this.editMovieDialog = true
		},
		closeEditMovieDialog() {
			this.editMovie = {}
			this.editMovieDialog = false
		},
		openCreateDialog() {
			this.newMovie = {
				title: "",
				description: "",
				picture: "",
				year_released: "",
				director_id: "",
				actors: []
			}
			this.createMovieDialog = true
		},
		closeCreateDialog() {
			this.newMovie = {
				title: "",
				description: "",
				picture: "",
				year_released: "",
				director_id: "",
				actors: []
			}
			this.createMovieDialog = false
		},
		createMovie() {
			console.log(this.newMovie)
			this.movieIsCreating = true
			this.newMovieErrorMessage = null
			this.$store
				.dispatch("movies/createMovie", this.newMovie)
				.then(() => {
					this.closeCreateDialog()
					this.movieIsCreating = false
				})
				.catch((error) => {
					this.newMovieErrorMessage = error.response.data.data
					this.movieIsCreating = false
				})
		},
		createDirector() {
			this.movieIsCreating = true
			this.newDirectorErrorMessage = null
			this.$store
				.dispatch("directors/createDirector", this.newDirector)
				.then(() => {
					this.closeCreateDialog()
					this.movieIsCreating = false
				})
				.catch((error) => {
					this.newDirectorErrorMessage = error.response.data.data
					this.movieIsCreating = false
				})
		},
		createActor() {
			this.movieIsCreating = true
			this.newActorErrorMessage = null
			this.$store
				.dispatch("actors/createActor", this.newActor)
				.then(() => {
					this.closeCreateDialog()
					this.movieIsCreating = false
				})
				.catch((error) => {
					this.newActorErrorMessage = error.response.data.data
					this.movieIsCreating = false
				})
		},
		onExistingMoviePictureChange(e) {
			var image = e.target.files || e.dataTransfer.files
			if (!image.length) return
			this.editMovie.picture = image[0]
			this.movieIsUpdating = true
			this.$store
				.dispatch("movies/updateMoviePicture", this.editMovie)
				.then(() => {
					this.movieIsUpdating = false
				})
				.catch((error) => {
					this.editMovieErrorMessage = error.response.data.data
					this.movieIsUpdating = false
				})
		},
		onNewMovieFileChange(e) {
			this.newMovie.picture = null
			var image = e.target.files || e.dataTransfer.files

			if (!image.length) return

			this.newMovie.picture = image[0]
			console.log(this.newMovie)
		},
		deleteMovie() {
			this.movieIsDeleting = true
			this.deleteMovieErrorMessage = null
			this.$store
				.dispatch("movies/deleteMovie", this.selectedDeleteMovie)
				.then(() => {
					this.selectedDeleteMovie = false
					this.movieIsDeleting = false
					this.deleteMovieDialog = false
				})
				.catch((error) => {
					this.deleteMovieErrorMessage = error.response.data.data
					this.movieIsDeleting = false
				})
		}
	}
}

// getMovies() {
//     this.$store.dispatch("movies/getMovies").then(() => {
//         this.movieIsLoading = false
//     })
// }
