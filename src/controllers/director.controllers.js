const catchError = require('../utils/catchError');
const Directors = require('../models/Directors');
const Movies = require('../models/Movies');

const getAll = catchError(async(req, res) => {
    const directors = await Directors.findAll({include: [Movies]});
    return res.json(directors);
});

const create = catchError(async(req, res) => {
    const {firstName, lastName, nationality, image, birthday} = req.body;
    const director = await Directors.create({
        firstName: firstName,
        lastName: lastName,
        nationality: nationality,
        image: image,
        birthday: birthday,
    });
    return res.status(201).json(director);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const director = await Directors.findByPk(id, {include: [Movies]});
    if(!director) return res.status(404).json({
        message: "director not found"
    });
    return res.json(director);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Directors.destroy({ where: {id: id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const director = await Directors.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(director[0] === 0) return res.sendStatus(404);
    return res.json(director[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
}