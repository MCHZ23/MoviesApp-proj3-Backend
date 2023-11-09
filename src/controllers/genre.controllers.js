const catchError = require('../utils/catchError');
const Genres = require('../models/Genres');
const Movies = require('../models/Movies');

const getAll = catchError(async(req, res) => {
    const genres = await Genres.findAll({include: [Movies]});
    return res.json(genres);
});

const create = catchError(async(req, res) => {
    const {name} = req.body;
    const genre = await Genres.create({
        name: name,
    });
    return res.status(201).json(genre);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const genre = await Genres.findByPk(id, {include: [Movies]});
    if(!genre) return res.status(404).json({
        massage: "genre not found"
    });
    return res.json(genre);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Genres.destroy({ where: {id: id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const genre = await Genres.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(genre[0] === 0) return res.sendStatus(404);
    return res.json(genre[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
}