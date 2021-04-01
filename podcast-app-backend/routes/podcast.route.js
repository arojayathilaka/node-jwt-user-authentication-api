const express = require('express');
const router = express.Router();
const Podcast = require('../models/Podcastmodel');

router.route('/').get((req, res) => {
    Podcast.find()
        .then(podcasts =>
            res.status(200).send(podcasts)
        )
        .catch(err =>
            // res.json()
                res.status(400).json('Error: ' + err)
            //res.status(400).header('Content-Type', 'application/json').send({message: 'Error: ' + err})
        );
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const tag = req.body.tag;
    const url = req.body.url;

    console.log(req.body);

    const newPodcast = new Podcast({ name, tag, url });
    console.log(newPodcast);
    newPodcast.save()
        .then(() => res.send({message: 'Podcast added!'}))
        .catch(err =>
            res.status(400).send({message: 'Error: ' + err})
        );
});

router.route('/delete/:id').delete((req, res) => {
    Podcast.findByIdAndDelete(req.params.id)
        .then(() => res.send({message: 'Podcast deleted!'}))
        .catch(err =>
            res.status(400).send({message: 'Error: ' + err})
        );
});

router.route('/update/:id').put((req, res) => {
    Podcast.findById(req.params.id)
        .then(podcast => {
            podcast.name = req.body.name;
            podcast.tag = req.body.tag;
            podcast.url = req.body.url;

            podcast.save()
                .then(() => res.send({message:'Podcast updated!'}))
                .catch(err =>
                    res.status(400).send({message: 'Error: ' + err})
                );
        })
        .catch(err =>
            res.status(400).json('Error: ' + err)
        );
});

module.exports = router;