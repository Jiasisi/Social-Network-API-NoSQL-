const { User, Thought } = require('../models');

module.exports = {
  // get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().sort({username: 1});
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // get a single user
  async getSingleUser(req, res) {
    try {
      const singleUser = await User.findOne({ _id: req.params.userId })
    
      if (!singleUser) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(singleUser);
    } catch (err) {
      res.status(500).json(err);
    } 
  },

  // create a new user
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //update a user
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
      if (!updatedUser) {
        res.json({message: 'No user with that ID'});

      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete a user and associated thoughts
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });
      res.json(deletedUser)

    } catch (err) {
      res.status(500).json(err);
    }
  },

  // add a friend
  async addFriend(req, res) {
    try {
      const newFriend = await User.findOneAndUpdate({_id: req.params.id}, {$push: {friends: req.params.friendId}});
      res.status(200).json(newFriend);

    } catch(err){
      res.status(500).json(err);
    }
  },

  // delete a friend
  async deleteFriend(req, res) {
    try {
      const deletedFriend = await User.findOneAndUpdate({_id: req.params.id}, {$pull: {friends: req.params.friendId}});
      res.json(deletedFriend);

    } catch(err){
      res.status(500).json(err);
    }
  }

};