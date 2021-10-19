const { sign, verify } = require("jsonwebtoken");

const createToken = (user) => {
  const accessToken = sign(
    {
      username: user.username,
      id: user._id,
      avatarImageURL: user.avatarImageURL,
    },
    process.env.ACCESS_TOKEN
  );

  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) return res.json({ error: "User not logged in !" });

  try {
    const validToken = verify(accessToken, process.env.ACCESS_TOKEN);
    req.user = validToken;

    if (validToken) {
      return next();
    }
  } catch (error) {
    return res.json({ error: error });
  }
};

const createEmailToken = (_id) => {
  const emailToken = sign({ _id }, process.env.EMAIL_TOKEN, {
    expiresIn: "2h",
  });
  return emailToken;
};

module.exports = { createToken, validateToken, createEmailToken };
