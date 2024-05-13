const handleErrors = require('../utils/errors');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const sendCustomEmail = require('../utils/sendEmail');

exports.updateUser = async (req, res, next) => {
  const user = req.user;
  const userId = req.params.id;
  if (user.id !== userId) {
    return next(handleErrors(401, 'You can only update your profile'));
  }
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password: pass, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const user = req.user;
  const userId = req.params.id;
  if (user.id !== userId) {
    return next(handleErrors(401, 'You can only delete your account'));
  }
  try {
    await User.findByIdAndDelete(userId);
    res.clearCookie('accessToken');
    res.status(200).json({ msg: 'Account successfully deleted' });
  } catch (error) {
    next();
  }
};

exports.getUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ msg: 'User not found!' });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.sendEmail = (req, res, next) => {
  const { sender, receiver, subject, message } = req.body;
  console.log(req.body);
  try {
    const html = `${message}`;
    sendCustomEmail(sender, receiver, subject, html);
    res.status(200).json({ msg: 'Message sent' });
  } catch (error) {
    next(error);
  }
};
