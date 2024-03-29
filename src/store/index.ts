import { createStore } from "vuex"
import { auth } from "./auth.module"
import { user } from "./user.module"
import { movies } from "./movie.module"

const store = createStore({
	modules: {
		auth,
		user,
		movies
	}
})

export default store
