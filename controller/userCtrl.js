const { ObjectId } = require('mongodb');
const User = require('../model/userModel');

const userCtrl = {
  follow: async (req, res) => {
    try {
      const user = await User.find({
        _id: req.userId,
        following: req.params.id,
      }).exec();
      if (user.length!=0)
        return res
          .status(400)
          .json({ success: true, message: 'You have followed this user!' });

      const followingUser = await User.findByIdAndUpdate(
        { _id: req.userId },
        { $push: { following: req.params.id } },
        { new: true }
      );

      const followerUser = await User.findByIdAndUpdate(
        { _id: req.params.id },
        { $push: { followers: req.userId } },
        { new: true }
      );

      res.json({ success: true, message: 'update follow user', followingUser });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  },
  unfollow: async (req, res) => {
    try {
      const unfollowUser = await User.findOneAndUpdate(
        { _id: req.userId },
        {
          $pull: { following: req.params.id }
        }
      );

      const unfollowerUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { followers: req.userId },
        }
      );

      // if (unfollowUser.length == 0)
      //   res
      //     .status(400)
      //     .json({ success: false, message: 'Not found unfollow User' });

      res.json({ success: true, message: 'unfollow User' });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  },

  searchUser: async (req, res) => {
    const { search } = req.body;

    //simple validation
    if (!search)
      return res
        .status(400)
        .json({ success: false, message: 'username is required' });

    try {
      const users = await User.find({
        email: { $regex: search } 
    });

      res.json({ success: true, users });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Interal server error' });
    }
  },
};

module.exports = userCtrl;