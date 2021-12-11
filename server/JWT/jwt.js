const { sign, verify } = require("jsonwebtoken");
const moment = require("moment");

const generateToken = (
  userData,
  expires,
  type,
  secretToken = process.env.ACCESS_TOKEN
) => {
  const data = {
    sub: {
      id: userData._id,
      fullName: userData.fullName,
      avatarImageURL: userData.avatarImageURL,
      isVerify: userData.isVerify,
      email: userData.email,
    },
    exp: expires.unix(),
    type,
  };
  return sign(data, secretToken);
};

const createToken = (user) => {
  const accessTokenExpire = moment().add("30", "days");
  const accessToken = generateToken(user, accessTokenExpire, "access");

  return {
    access: { token: accessToken, expire: accessTokenExpire.toDate() },
  };
};

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) return res.json({ error: "User not logged in!" });

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

const createEmailToken = (_id, type) => {
  const emailToken = sign({ _id, type }, process.env.EMAIL_TOKEN, {
    expiresIn: "2h",
  });
  return emailToken;
};

module.exports = { createToken, validateToken, createEmailToken };
