const User = require("../../database/model/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const removeFollow = async (req, res) => {
  try {
    const token = req.cookies.token;

    const verifiedUser = jwt.verify(token, process.env.TOKEN_KEY);

    const userId = verifiedUser.id;

    const user = await User.findById(userId);

    const userToUnfollow = req.body.usertounfollow;

    if (!userToUnfollow) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    const user2 = await User.findById(userToUnfollow);

    if (!user2) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const isFollowing = user.following.some(
      (follow) => follow.user.toString() === user2._id.toString()
    );

    if (isFollowing) {
      // Remove user2 from user's following list
      user.following = user.following.filter(
        (follow) => follow.user.toString() !== user2._id.toString()
      );

      // Remove user from user2's followed list
      user2.followed = user2.followed.filter(
        (follow) => follow.user.toString() !== user._id.toString()
      );

      await user.save();
      await user2.save();

      res.status(200).json({ message: `You unfollowed ${user2.username}` });
    } else {
      res.status(404).json({ message: "You are not following this user" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = removeFollow;
