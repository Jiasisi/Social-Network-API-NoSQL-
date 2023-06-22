const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtContoller');

//api/thought
router.route('/').get(getThoughts).post(createThought);

//api/thought/:id
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);

//api/thought/:thoughtId/reaction
router.route('/:id/reaction').post(addReaction).delete(deleteReaction);

module.exports = router;