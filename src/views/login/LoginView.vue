<template>
	<div class="flexbox centervh">
		<!-- <button v-if="!isAuthenticated" @click="submitLogin()">
			Login Page Placeholder Here
		</button> -->

		<div class="login-box">
			<h1 class="logo-area">Login Here</h1>
			<div class="input-fields">
				<v-form v-model="isFormValid">
					<div class="text-input">
						<v-text-field
							v-model="email"
							label="Email"
							:rules="loginRules.emailRules"
							hide-details="auto"
						></v-text-field>
						<v-text-field
							v-model="password"
							label="Password"
							type="password"
							:rules="loginRules.passwordRules"
							hide-details="auto"
							@keyup.enter="submitLogin()"
						></v-text-field>
						<v-alert
							v-if="errorMsg !== ''"
							:type="alertType"
							@click="errorMsg = ''"
							>{{ errorMsg }}</v-alert
						>
					</div>
				</v-form>
				<div class="button-container">
					<v-btn
						v-if="!isAuthenticated"
						:loading="isLoading"
						:disabled="!isFormValid"
						@click="submitLogin()"
						>Login Here</v-btn
					>
					<v-btn @click="dialog = true">Forgot Password</v-btn>
					<v-dialog v-model="dialog" :scrim="false" persistent>
						<v-card>
							<v-card-text>
								<v-text-field
									v-model="email"
									label="Password Reset Email"
									:rules="emailRules"
									hide-details="auto"
								></v-text-field>
							</v-card-text>
							<v-card-actions>
								<v-btn variant="text" @click="dialog = false"
									>Close</v-btn
								>
							</v-card-actions>
						</v-card>
					</v-dialog>

					<v-btn @click="registerDialog = true">Register</v-btn>
					<v-dialog
						v-model="registerDialog"
						:scrim="false"
						persistent
					>
						<v-card>
							<v-form v-model="isRegisterFormValid">
								<v-card-text>
									<v-text-field
										v-model="register.name"
										label="Full Name"
										:rules="registerRules.nameRules"
										hide-details="auto"
									></v-text-field>
									<v-text-field
										v-model="register.email"
										label="Email"
										hide-details="auto"
										:rules="registerRules.emailRules"
									>
									</v-text-field>
									<v-text-field
										v-model="register.password"
										label="Password"
										hide-details="auto"
										type="password"
										:rules="registerRules.passwordRules"
									></v-text-field>
									<v-text-field
										v-model="register.c_password"
										label="Password Confirmation"
										hide-deatils="auto"
										type="password"
										:rules="registerRules.c_passwordRules"
									></v-text-field>
								</v-card-text>
							</v-form>
							<v-card-actions>
								<v-btn
									variant="text"
									:disabled="!isRegisterFormValid"
									:loading="registerFormIsLoading"
									@click="submitRegister()"
									>Save</v-btn
								>
								<v-btn
									variant="text"
									@click="registerDialog = false"
									>Close</v-btn
								>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</div>
			</div>
		</div>
	</div>
</template>
<script src="./LoginView.ts" />

<style src="./LoginView.scss" />
