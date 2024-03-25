export default {
	name: "LoginView",
	emits: ["authenticate"],
	data: function () {
		return {
			isAuthenticated: false,
			alertType: "error",
			errorMsg: "",
			isFormValid: false,
			name: "",
			password: "",
			c_password: "",
			email: "",
			dialog: false,
			registerDialog: false,
			isRegisterFormValid: false,
			isLoading: false,
			emailRules: [
				(value) => !!value || "Required.",
				(value) => (value && value.length >= 3) || "Min 3 characters"
			],
			passwordRules: [
				(value) => !!value || "Required.",
				(value) => (value && value.length >= 8) || "Min 8 characters"
			],
			loginRules: {
				emailRules: [
					(value) => !!value || "Required.",
					(value) =>
						(value && value.length >= 3) || "Min 3 characters"
				],
				passwordRules: [
					(value) => !!value || "Required.",
					(value) =>
						(value && value.length >= 8) || "Min 8 characters"
				]
			},
			registerRules: {
				nameRules: [(value) => !!value || "Required."],
				emailRules: [
					(value) => !!value || "Required.",
					(value) =>
						(value && value.length >= 3) || "Min 3 characters"
				],
				passwordRules: [
					(value) => !!value || "Required.",
					(value) =>
						(value && value.length >= 8) || "Min 8 characters"
				],
				c_passwordRules: [
					(value) => !!value || "Required.",
					(value) =>
						value === this.register.password ||
						"Passwords do not match.",
					(value) =>
						(value && value.length >= 8) || "Min 8 characters"
				]
			},
			register: {
				name: "",
				email: "",
				password: "",
				c_password: ""
			}
		}
	},
	updated() {
		console.log(this.isFormValid)
	},
	methods: {
		submitLogin() {
			if (!this.isFormValid) {
				return
			}
			const user = {
				email: this.email,
				password: this.password
			}
			this.errorMsg = ""
			this.isLoading = true
			this.$store.dispatch("auth/login", user).then(
				() => {
					setTimeout(() => {
						window.location.reload()
					}, 2000)
				},
				(error) => {
					this.isLoading = false
					this.errorMsg =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString()
				}
			)
		},

		submitRegister() {
			if (!this.isRegisterFormValid) {
				return
			}

			const register = {
				name: this.register.name,
				email: this.register.email,
				password: this.register.password,
				c_password: this.register.c_password
			}

			this.registerFormIsLoading = true
			this.$store.dispatch("auth/register", register).then(
				() => {
					alert("success!")
					this.registerFormIsLoading = false
					this.registerDialog = false
				},
				(error) => {
					this.registerFormIsLoading = false
					alert("error!")
				}
			)
		},

		forgotPassword() {
			console.log("here")
		}
	}
}
