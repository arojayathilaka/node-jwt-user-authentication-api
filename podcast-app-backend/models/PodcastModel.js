const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create schema
const podcastSchema = new Schema({
    name: { type: String, required: true },
    tag: { type: String, required: true },
    url: { type: String, required: true },
}, {
    timestamps: true
});

const Podcast = mongoose.model('Podcast', podcastSchema);

module.exports = Podcast;