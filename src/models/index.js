const Actors = require("./Actors");
const Movies = require("./Movies");
const Genres = require("./Genres");
const Directors = require("./Directors");

Movies.belongsToMany(Actors, { through: "MoviesActors"});
Actors.belongsToMany(Movies, { through: "MoviesActors"});

Movies.belongsToMany(Genres, { through: "MoviesGenres"});
Genres.belongsToMany(Movies, { through: "MoviesGenres"});

Movies.belongsToMany(Directors, { through: "MoviesDirectors"});
Directors.belongsToMany(Movies, { through: "MoviesDirectors"});

