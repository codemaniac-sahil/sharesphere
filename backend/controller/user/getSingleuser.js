const User = require("../../database/model/user");

require("dotenv").config();

const getSingleUser = async (req, res) => {
  //   const token = req.cookies.token;
  //   if (!token) {
  //     res.status(401).json({ message: "Unauthorized" });
  //   }
  //   const verifiedUser = jwt.verify(token, process.env.TOKEN_KEY);

  //   const loggedInUserId = verifiedUser.id;
  const userId = req.params.id;
  // console.log(userId);
  try {
    const user = await User.find({ _id: userId })
      .populate("post")
      .populate("followings.user")
      .populate("followers.user");
    // console.log(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(401).json({ error });
  }
};
module.exports = getSingleUser;
