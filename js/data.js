import {  } from './notification.js';
import API from './api.js';


const endpoints = {    
   MOVIES: 'data/movies',
   MOVIE_BY_ID: 'data/movies/',

};

const api = new API(
    'E1632E90-0C7A-4737-FF22-1563BE9FEA00',
    '4E032196-0392-4623-BEAB-F20007255613',
    // beginRequest,
    // endRequest
)

export const login = api.login.bind(api);
export const register = api.register.bind(api);
export const logout = api.logout.bind(api);

// get all movies
export async function getAll(text) {
    // "name LIKE '%J%'"
    // ?where=title%20LIKE%20%27%25J%25%27
    if (text) {
        return api.get(endpoints.MOVIES + `?where=title%20LIKE%20%27%25${text}%25%27`)
    } else {
        return api.get(endpoints.MOVIES)
    }
}

// create movie
export async function createMovie(movie) {
    return api.post(endpoints.MOVIES, movie);
 }

// get movie by id
export async function getMovieById(id) {
    return api.get(endpoints.MOVIE_BY_ID + id);
 }

// edit movie by id
export async function editMovie(id, movie) {
    return api.put(endpoints.MOVIE_BY_ID + id, movie);
 }

// delete movie
export async function deleteMovie(id) {
    return api.delete(endpoints.MOVIE_BY_ID + id);
}

// like
// export async function likeMovie(id) {
//     const movie = await getMovieById(id);

//     return await editMovie(id, movie);
// }

export function checkResult(result) {
    if (result.hasOwnProperty('errorData')) {
        const error = new Error();
        Object.assign(error, result);
        throw error;
    }
}

