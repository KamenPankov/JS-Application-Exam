import { home } from "./controllers/home.js";
import { registerPage, registerPost, loginPage, loginPost, logoutUser } from "./controllers/users.js";
import { createMoviePage, createMoviePost, detailsMoviePage, editMoviePage, editMoviePost, eraseMovie, like } from "./controllers/movies.js";

window.addEventListener('load', () => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            email: localStorage.getItem('email') || '',
            userToken: localStorage.getItem('userToken') || '',
            userId: localStorage.getItem('userId') || '',
        };

        this.get('/', home);
        this.get('#/home', home);
        this.get('#/index.html', home);

        this.get('#/register', registerPage);
        this.get('#/login', loginPage);
        this.get('#/logout', logoutUser);

        this.get('#/create', createMoviePage);
        this.get('#/details/:id', detailsMoviePage);
        this.get('#/edit/:id', editMoviePage);
        this.get('#/delete/:id', eraseMovie);
        this.get('#/like/:id', like);
        //this.get('#/search', home);



        this.post('#/register', (ctx) => { registerPost.call(ctx); });
        this.post('#/login', (ctx) => { loginPost.call(ctx); });

        this.post('#/create', (ctx) => { createMoviePost.call(ctx); });
        this.post('#/edit/:id', (ctx) => { editMoviePost.call(ctx); });


    });

    app.run();
})