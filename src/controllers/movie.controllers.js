const catchError = require('../utils/catchError');
const Movies = require('../models/Movies');
const Actors = require('../models/Actors');
const Genres = require('../models/Genres');
const Directors = require('../models/Directors');

const getAll = catchError(async(req, res) => {
    const movies = await Movies.findAll({
        include: [Actors, Genres, Directors]
    });
    return res.json(movies);
});

const create = catchError(async(req, res) => {
    const {name, image, synopsis, releaseYear} = req.body;
    const movie = await Movies.create({
        name: name,
        image: image,
        synopsis: synopsis,
        releaseYear: releaseYear,
    });
    return res.status(201).json(movie);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const movie = await Movies.findByPk(id, {
        include: [Actors, Genres, Directors]
    });
    if(!movie) return res.status(404).json({
        massage: " mivie not found"
    });
    return res.json(movie);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Movies.destroy({ where: {id: id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const movie = await Movies.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(movie[0] === 0) return res.sendStatus(404);
    return res.json(movie[1][0]);
});

const setMovieActors = catchError(async(req, res) => {
    const {id} = req.params;
    const movie = await Movies.findByPk(id);
    await movie.setActors (req.body);
    const movies = await movie.getActors();
    return res.json(movies);
})

const  setMovieGenres = (async(req, res) => {
    const {id} = req.params;
    const movie = await Movies.findByPk(id);
    if (!movie) return res.status(404).json({massage: "movies not found"})
    await movie.setGenres (req.body);
    const genres = await movie.getGenres();
    return res.json(genres);
})

const  setMovieDirectors = (async(req, res) => {
    const {id} = req.params;
    const movie = await Movies.findByPk(id);
    if (!movie) return res.status(404).json({massage: "movies not found"})
    await movie.setDirectors (req.body);
    const directors = await movie.getDirectors();
    return res.json(directors);
})



module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setMovieActors,
    setMovieGenres,
    setMovieDirectors
}