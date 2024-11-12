app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    try {
      const { email } = req.user;

      // Check if the user already exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        // Generate JWT and log the user in
        // const token = generateJWT(existingUser); // Assuming you have a function to generate JWT

        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET, // Ensure your JWT_SECRET is set in environment variables
          { expiresIn: '1h' }
        );
        res.status(200).json({
          message: 'Login successful',
          token,
          role: user.role,
        });
        res.redirect('/main'); // Redirect to the dashboard or relevant page
      } else {
        // If user does not exist, redirect to login with an error message
        res.redirect('/login?error=User not found');
      }
    } catch (error) {
      console.error(error);
      res.redirect('/login');
    }
  }
);
