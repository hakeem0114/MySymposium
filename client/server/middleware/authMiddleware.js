import jwt from "jsonwebtoken";

//Fixed the middleware using POSTMAN API
//The reason was because of the spacing between the Bearer token for startWith

/*
Lots of sites includes chrome use this & require this
The OAuth 2.0 Authorization Framework sets a number of other requirements to keep authorization secure, 
for instance requiring the use of HTTPS/TLS.


*/

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};