exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      //   const decoded = await promisify(jwt.verify)(
      //     req.cookies.jwt,
      //     process.env.JWT_SECRET
      //   );
      //   console.log(decoded);
      //   const freshUser = await User.findById(decoded.id);
      //   console.log(freshUser);

      return next();
    } catch (error) {
      return console.log(err);
    }
  } else {
    res.send({ status: "failed" });
  }
};
