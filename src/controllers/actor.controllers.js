const catchError = require('../utils/catchError');
const Actors = require('../models/Actors');
const Movies = require('../models/Movies');

const getAll = catchError(async(req, res) => {
    const actors = await Actors.findAll({
        include: [Movies]
    });
    return res.json(actors);
});

const create = catchError(async(req, res) => {
    const {firstName, lastName, nationality, image, birthday} = req.body;
    const actor = await Actors.create({
        firstName: firstName,
        lastName: lastName,
        nationality: nationality,
        image: image,
        birthday: birthday,
    });
    return res.status(201).json(actor);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const actor = await Actors.findByPk(id, {include: [Movies]});
    if(!actor) return res.status(404).json({
        massage: "autor not found"
    });
    return res.json(actor);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Actors.destroy({ where: {id: id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const actor = await Actors.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(actor[0] === 0) return res.sendStatus(404);
    return res.json(actor[1][0]);
});



module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
}