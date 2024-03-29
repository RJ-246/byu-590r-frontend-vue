<script lang="ts">
import { RouterLink, RouterView } from "vue-router"
import LoginView from "./views/login/LoginView.vue"
import MoviesView from "./views/movies/MoviesView.vue"
import { mapState } from "vuex"
import { ref } from "vue"
export default {
	setup() {
		const theme = ref("dark")
		function changeTheme() {
			theme.value = theme.value === "light" ? "dark" : "light"
		}
		return { theme, changeTheme }
	},
	name: "App",
	components: {
		LoginView,
		RouterLink,
		RouterView
	},
	data: function () {
		return {
			profileDialog: false,
			profileIsUploading: false,
			profileIsDeleting: false,
			verificationEmailLoading: false,
			showEmailNotVerifiedDialog: false,
			showChangeEmailTextField: false,
			changeEmail: false,
			successVerificationMessage: "",
			changeEmailRules: [
				(value) => !!value || "Required.",
				(value) => (value && value.length >= 3) || "Min 3 characters"
			],
			profile: {
				avatar: "",
				name: "",
				title: "",
				icon: "mdi-account-circle",
				color: "info"
			},
			profilePictureImage: "",
			emailOfVerification: "",
			profilePictureChangeLabel: "Upload an image",
			menuDropdown: false
		}
	},

	computed: {
		...mapState({
			user() {
				return this.$store.state.user.user
			},
			auth() {
				return this.$store.state.auth
			},
			authUser() {
				return this.auth.user
			},
			isAuthenticated() {
				return (
					this.auth.status.loggedIn &&
					this.authUser.token !== undefined
				)
			},
			title() {
				return "Welcome " + this.authUser.name + "!"
			},
			avatarURL() {
				return this.auth.user.avatar
			}
		})
	},
	created() {
		if (this.authUser) {
			this.getCurrentUser()
		}
	},
	updated() {
		if (this.isAuthenticated) {
			this.$router.push({ name: "home" })
		}
	},
	methods: {
		logout() {
			this.$store.dispatch("auth/logout")
		},
		checkAuth(auth) {
			console.log("Authenticated!", auth)
		},
		onAvatarChange(e) {
			var image = e.target.files || e.dataTransfer.files

			if (!image.length) return
			this.profileIsUploading = true
			this.$store
				.dispatch("user/uploadAvatar", image[0], { root: true })
				.then((response) => {
					console.log(response.avatar)
					this.$store.commit(
						"auth/uploadAvatarSuccess",
						response.avatar
					)
					this.profileIsUploading = false
					console.log(this.profile.avatar)
				})
				.catch((error) => {
					console.log(error)
					alert("Error. Try again")
					this.profileIsUploading = false
				})
		},
		removeAvatar() {
			this.profileIsDeleting = true
			this.$store
				.dispatch("user/removeAvatar")
				.then((response) => {
					this.$store.commit(
						"auth/uploadAvatarSuccess",
						response.avatar
					)
					this.profileIsDeleting = false
				})
				.catch((error) => {
					console.log(error)
					alert("Error. Try again")
					this.profileIsDeleting = false
				})
		},
		getCurrentUser() {
			this.profile.name = this.authUser.name

			this.profile.title = this.title
			this.$store.dispatch("user/getUser").then((response) => {
				if (response.avatar) {
					this.$store.commit(
						"auth/uploadAvatarSuccess",
						response.avatar
					)
				}
				if (!response.email_verified_at) {
					this.showEmailNotVerifiedDialog = true
				}
			})
		}
	}
}
</script>
<template>
	<v-app :theme="theme">
		<v-app-bar
			:title="authUser.name === undefined ? '' : title"
			v-if="isAuthenticated"
		>
			<v-spacer></v-spacer>
			<v-btn to="/" default>Home</v-btn>
			<v-btn to="about">About</v-btn>
			<v-btn to="movies">Movies</v-btn>
			<v-avatar color="surface-variant">
				<v-img v-if="avatarURL" :src="avatarURL"></v-img>
				<v-icon
					v-else
					:color="profile.color"
					:icon="profile.icon"
				></v-icon>
				<v-menu
					v-model="menuDropdown"
					:close-on-content-click="false"
					activator="parent"
				>
					<v-card min-width="200">
						<div class="profile-div">
							<div class="inner-profile">
								<div class="profile-div">
									<p class="font-weight-black">
										{{ this.profile.name }}
									</p>
								</div>
								<v-divider></v-divider>
								<v-btn
									:prepend-icon="
										theme === 'light'
											? 'mdi-weather-sunny'
											: 'mdi-weather-night'
									"
									@click="changeTheme"
									>Toggle Theme</v-btn
								>
								<v-btn @click="profileDialog = true"
									>Profile</v-btn
								>
							</div>
							<v-dialog v-model="profileDialog">
								<v-card>
									<v-card-title>Profile</v-card-title>
									<v-card-subtitle
										>Enter your profile options
										here.</v-card-subtitle
									>
									<v-card
										class="mx-auto"
										min-width="25%"
										max-width="400"
										rounded="0"
									>
										<!-- <div class="profile-div"> -->
										<!-- <div class="inner-profile"> -->
										<v-img
											cover
											v-if="avatarURL"
											:src="avatarURL"
										></v-img>
										<v-icon
											v-else
											:color="profile.color"
											:icon="profile.icon"
										></v-icon>

										<v-file-input
											accept="image/*"
											:loading="profileIsUploading"
											:disabled="profileIsUploading"
											@change="onAvatarChange"
											:label="profilePictureChangeLabel"
										></v-file-input>
									</v-card>
									<!-- </div> -->
									<!-- </div> -->
									<v-btn
										@click="removeAvatar()"
										:loading="profileIsDeleting"
										>Remove Profile Picture</v-btn
									>
								</v-card>
							</v-dialog>

							<v-divider></v-divider>
							<v-btn @click="logout()">Logout</v-btn>
						</div>
					</v-card>
				</v-menu>
			</v-avatar>
		</v-app-bar>

		<v-main>
			<v-container>
				<div v-if="isAuthenticated">
					<RouterView />
				</div>
				<LoginView
					v-else
					:is-authenticated="isAuthenticated"
					@authenticate="checkAuth($event)"
				/>
			</v-container>
		</v-main>
	</v-app>
</template>
