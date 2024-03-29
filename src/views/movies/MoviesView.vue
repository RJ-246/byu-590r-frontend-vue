<template>
	<v-progress-circular
		v-if="movieIsLoading"
		indeterminate
	></v-progress-circular>
	<v-row v-else>
		<v-col cols="12">
			<v-btn
				color="green"
				@click="openCreateDialog()"
				prepend-icon="mdi-plus"
				>Create</v-btn
			>
		</v-col>
		<v-col v-for="movie in movies" :key="movie" cols="4">
			<v-card>
				<v-card-item>
					<v-card-title>
						<v-row>
							<v-col cols="8">
								{{ movie.title }}
							</v-col>
							<v-col cols="4">
								<div>
									<v-btn
										round
										@click="openEditMovieDialog(movie)"
										icon="mdi-pencil"
										color="warning"
										size="small"
									></v-btn>
									<v-btn
										round
										@click="openDeleteMovieDialog(movie)"
										icon="mdi-delete"
										color="error"
										size="small"
									></v-btn>
								</div>
							</v-col>
						</v-row>
					</v-card-title>
					<v-card-subtitle>{{ movie.year_released }}</v-card-subtitle>
					<v-card-item>
						<v-img :src="movie.picture"></v-img>
					</v-card-item>
					<v-card-text>{{ movie.description }}</v-card-text>
					<v-row>
						<v-col cols="6" v-if="movie.actors.length > 0">
							<div>
								<v-card-text class="text-h6"
									>Actors</v-card-text
								>
							</div>
							<v-divider></v-divider>
							<div v-for="actor in movie.actors">
								<v-card-text>{{ actor.name }}</v-card-text>
							</div>
						</v-col>
						<v-col cols="6" v-if="movie.director || movie.genre">
							<div>
								<v-card-text class="text-h6"
									>Director</v-card-text
								>
							</div>
							<v-divider></v-divider>
							<v-card-text>{{ movie.director.name }}</v-card-text>

							<div>
								<v-card-text class="text-h6">Genre</v-card-text>
							</div>
							<v-divider></v-divider>
							<v-card-text>{{ movie.genre.name }}</v-card-text>
						</v-col>
					</v-row>
				</v-card-item>
			</v-card>
		</v-col>
	</v-row>

	<v-dialog v-model="createMovieDialog" persistent width="1536">
		<v-card>
			<v-card-title>
				<p class="text-h5">Create a New Movie</p>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-row>
						<v-col cols="12" sm="6" md="4">
							<v-text-field
								v-model="newMovie.title"
								label="Movie Title*"
								required
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-text-field
								v-model="newMovie.description"
								label="Movie Description*"
								required
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-text-field
								v-model="newMovie.year_released"
								label="Year Released*"
								type="number"
								placeholder="2000"
								required
							></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-file-input
							accept="image/*"
							@change="onNewMovieFileChange"
							label="File*"
						></v-file-input>
					</v-row>
				</v-container>
				<small>*indicates required field</small>

				<v-alert v-if="newMovieErrorMessage" type="error">{{
					newMovieErrorMessage
				}}</v-alert>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					color="blue-darken-1"
					:disabled="newMovieErrorMessage"
					variant="text"
					@click="closeCreateDialog()"
					>Close</v-btn
				>

				<v-btn
					color="blue-darken-1"
					variant="text"
					@click="createMovie()"
					:loading="movieIsCreating"
					:disabled="movieIsCreating"
					>Save</v-btn
				>
			</v-card-actions>
		</v-card>
	</v-dialog>

	<v-dialog v-model="editMovieDialog" persistent width="1536">
		<v-card>
			<v-card-title>
				<p class="text-h5">Edit {{ editMovie.title }}</p>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-row>
						<v-col cols="12" sm="6" md="4">
							<v-text-field
								v-model="editMovie.title"
								label="Movie Title*"
								required
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-text-field
								v-model="editMovie.description"
								label="Movie Description*"
								required
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="6" md="4">
							<v-text-field
								v-model="editMovie.year_released"
								label="Year Released*"
								type="number"
								placeholder="2000"
								required
							></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<div v-if="editFileChangeDialogBtn">
							<v-file-input
								accept="image/*"
								@change="onExistingMoviePictureChange"
								label="File Change"
							></v-file-input>
							<v-btn @click="editFileChangeDialogBtn = false"
								>Cancel File Change</v-btn
							>
						</div>
						<v-btn v-else @click="editFileChangeDialogBtn = true"
							>Change File</v-btn
						>
					</v-row>
				</v-container>
				<small>*indicates required field</small>

				<v-alert v-if="editMovieErrorMessage" type="error">{{
					editMovieErrorMessage
				}}</v-alert>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					color="blue-darken-1"
					:disabled="editMovieErrorMessage"
					variant="text"
					@click="closeEditMovieDialog()"
					>Close</v-btn
				>

				<v-btn
					color="blue-darken-1"
					variant="text"
					@click="editSelectedMovie()"
					:loading="movieIsUpdating"
					:disabled="movieIsUpdating"
					>Save</v-btn
				>
			</v-card-actions>
		</v-card>
	</v-dialog>

	<v-dialog v-model="deleteMovieDialog" width="auto">
		<v-card>
			<v-card-text>
				Are you sure you want to delete this movie? This cannot be
				undone! All data will be permanently removed.
			</v-card-text>
			<v-card-actions>
				<v-btn color="red" @click="deleteMovieDialog = null">No</v-btn>
				<v-btn
					color="green"
					@click="deleteMovie()"
					:loading="movieIsDeleting"
					:disabled="movieIsDeleting"
					>Yes</v-btn
				>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
<script src="./MoviesView.ts" />

<style src="./MoviesView.scss" />
