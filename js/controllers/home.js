import { getAll } from "../data.js";


export async function home() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        movie: await this.load('./templates/movies/movie.hbs'),
    };

    const context = Object.assign({}, this.app.userData);

    if (this.app.userData.email) {
        const movies = await getAll(this.params.search);
        context.movies = movies;        
    }

    this.partial('./templates/home.hbs', context);
}