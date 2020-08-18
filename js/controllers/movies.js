import { showError, showInfo } from "../notification.js";
import { createMovie, checkResult, getMovieById, editMovie, deleteMovie } from "../data.js";

export async function createMoviePage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    const context = Object.assign({}, this.app.userData);


    this.partial('./templates/movies/create.hbs', context);
}

export async function detailsMoviePage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    const movie = await getMovieById(this.params.id);
    if (movie.peopleLiked == null) {
        movie.peopleLiked = [];
    }
    const context = Object.assign({ movie }, this.app.userData);

    if (movie.ownerId === this.app.userData.userId) {
        context.movie.canEdit = true;
    } else {        
        if (!movie.peopleLiked.includes(this.app.userData.email)) {
            context.movie.canLike = true;
        }
    }

    this.partial('./templates/movies/details.hbs', context);
}

export async function editMoviePage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    const movie = await getMovieById(this.params.id);
    const context = Object.assign({ movie }, this.app.userData);

    if (movie.ownerId === this.app.userData.userId) {
        context.movie.canEdit = true;
    }


    this.partial('./templates/movies/edit.hbs', context);
}

export async function createMoviePost() {

    try {
        const movie = {
            title: this.params.title,
            description: this.params.description,
            imageUrl: this.params.imageUrl,
        };

        if (Object.values(movie).some(v => v === '')) {
            throw new Error('Invalid input!');
        }

        const result = await createMovie(movie);
        checkResult(result);
        showInfo('Created successfully!');

        this.redirect('#/home');
    } catch (error) {
        showError(error.message);
    }
}

export async function editMoviePost() {

    try {
        const id = this.params.id;
        const movie = await getMovieById(id);

        movie.title = this.params.title;
        movie.description = this.params.description;
        movie.imageUrl = this.params.imageUrl;

        if (Object.values(movie).some(v => v === '')) {
            throw new Error('Invalid input!');
        }

        const result = await editMovie(id, movie);
        checkResult(result);
        showInfo('Edited successfully!');

        this.redirect(`#/details/${result.objectId}`);
    } catch (error) {
        showError(error.message);
    }
}

export async function eraseMovie() {
    try {
        const id = this.params.id;
        const result = await deleteMovie(id);
        checkResult(result);
        showInfo('Deleted successfully!');

        this.redirect('#/home');
    } catch (error) {
        showError(error.message);
    }
}

export async function like() {
    try {
        const id = this.params.id;
        const email = this.app.userData.email;
        const movie = await getMovieById(id);
        if (movie.peopleLiked == null) {
            movie.peopleLiked = [];
        }

        if (!movie.peopleLiked.includes(email)) {
            movie.peopleLiked.push(email);
            
            const result = await editMovie(id, movie);
            checkResult(result);
            showInfo('Liked successfully!');
            
            this.redirect(`#/details/${result.objectId}`);
        }        
    } catch (error) {
        showError(error.message);
    }
}