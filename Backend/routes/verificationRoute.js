app.post('/auth/google', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email });
      await user.save();
    }

    // Generate a session token or JWT
    const jwtToken = generateJWT(user);

    res.status(200).json({ token: jwtToken });
  } catch (error) {
    res
      .status(401)
      .json({ message: 'Invalid Google token', error: error.message });
  }
});
