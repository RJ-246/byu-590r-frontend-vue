import { createStore } from "vuex"
import { auth } from "./auth.module"
import { user } from "./user.module"
import { movies } from "./movie.module"
import { directors } from "./director.module"
import { actors } from "./actor.module"

const store = createStore({
	modules: {
		auth,
		user,
		movies,
		directors,
		actors
	}
})

export default store
