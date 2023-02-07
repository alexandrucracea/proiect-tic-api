module.exports = async (req, res) => {
  const secure = process.env.NODE_ENV === 'production';
  const now = new Date(0);
  res.cookie('jwt_refresh_token', '', {
    httpOnly: true,
    maxAge: now,
    sameSite: true,
    secure,
    signed: true,
  });

  return res.json({ message: 'Logout successful' });
};
