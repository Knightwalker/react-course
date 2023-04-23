"use strict";

import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    posterPath: {
        type: String
    },
    trailerPath: {
        type: String
    },
    thumbnailPath: {
        type: String
    },
    description: {
        type: String,
    }
});

const MovieModel = mongoose.model("Movie", MovieSchema);

export default MovieModel;