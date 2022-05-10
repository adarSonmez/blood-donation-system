const { verify } = require('jsonwebtoken');

function decodeToken(req, res) {
  let token = req.body.token;

  if (!token) return res.json({ loggedIn: false, message: 'Please login!' });

  try {
    const decoded = verify(token, process.env.TOKEN_SECRET);
    const { name, email, type } = decoded;
    return res.json({ loggedIn: true, user: { name, email, type } });
  } catch {
    return res.json({ loggedIn: false, message: 'Invalid token!' });
  }
}

module.exports = {
  decodeToken,
};
