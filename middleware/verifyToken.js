const jwt = require("jsonwebtoken");
// VERIFY TOKEN
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (error, user) => {
      if (error) res.status(403).json("Token is not valid");
      req.user = user;
      next();
    });
  } else {
    return res.status(403).json("You are not authorized");
  }
};

// VERIFY TOKEN AND AUTHORIZATION

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not authorized to do that!!");
    }
  });
};

// VERIFY IsAdmin??

const verifyIsAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not authorized to do that!!");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyIsAdmin };
