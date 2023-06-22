const { Thought, User } = require('../models');

module.exports = {
  
  // get all thoughts
  async getThoughts(req, res) {
    try {
      const allThoughts = await Thought.find().select(['-__v', '-createdAt']);
      res.json(allThoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },  

  // get a single thought
  async getSingleThought(req, res) {
    try {
      const singleThought = await Thought.findById({_id: req.params.id}).populate('reactions').select(['-__v', '-createdAt']);
      res.json(singleThought);
     
    } catch (err) {
      res.status(500).json(err);
    }
  },   

  // create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        })
      }

      res.json('Created the thought 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
 
  // update a thought
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        {_id: req.params.id}, req.body, {new: true}
      );

      res.json(updatedThought);
    } catch (err) {
      
      res.status(500).json(err);
    }
  },

  // delete a thought
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findOneAndDelete({ _id: req.params.id });
      res.json(deletedThought);

    } catch (err) {
      res.status(500).json(err);
    }
  },

  // add a reaction
  async addReaction(req, res) {
    try {
      const newReaction = await Thought.findOneAndUpdate(
        {id: req.params.thoughtId}, 
        {$addToSet: {reactions: req.body}}, 
        {new: true}
      );
      console.log('Created!');
      res.json(newReaction);

    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete a reaction
  async deleteReaction(req, res) {
    try {
      const deletedReaction = await Thought.findOneAndUpdate(
        {id: req.params.thoughtId},
        {$pull: {reactions: {reactionId: req.body.reactionId}}}, 
        {new: true}
      );
      console.log('Deleted!');
      res.json(deletedReaction);

    } catch (err) {
      res.status(500).json(err);
    }
  },
};
