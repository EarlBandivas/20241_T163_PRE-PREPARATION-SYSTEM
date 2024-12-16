import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Button } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../assets/BuksuLogo.png';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const navigate = useNavigate();

  const onChange = () => {
    setIsCaptchaVerified(true);
  };

  // Sign in function with role-based navigation
  const handleSignin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Determine the endpoint based on email (admin vs user)
      const loginEndpoint = email.includes('admin')
        ? 'http://localhost:5000/admin/login'  // Admin login
        : 'http://localhost:5000/users/login';  // User login

      // Send login request to the backend
      const response = await axios.post(loginEndpoint, {
        email,
        password,
      });

      console.log(response.data); // Log response for debugging

      if (response.data && response.data.token) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);

        // Redirect based on role
        if (response.data.role === 'admin') {
          toast.success('Admin login successful! Redirecting...', { autoClose: 1500 });
          setTimeout(() => navigate('/admin'), 1500); // Redirect to Admin page
        } else {
          toast.success('User login successful! Redirecting...', { autoClose: 1500 });
          setTimeout(() => navigate('/users'), 1500); // Redirect to User Main Page
        }
      } else {
        toast.error('Login failed: Token not received');
      }
    } catch (error) {
      console.error('Login failed:', error); // Debugging line
      toast.error(error.response?.data?.message || 'Login failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Google OAuth Success Handler
  const handleGoogleLoginSuccess = async (response) => {
    const googleToken = response.credential;

    try {
      // Send Google token to backend for validation and user login
      const res = await axios.post('http://localhost:5000/users/auth/google', {
        token: googleToken,
      });

      console.log(res.data); // Log response for debugging

      if (res.data && res.data.token) {
        // Store token in localStorage
        localStorage.setItem('token', res.data.token);

        // Redirect user based on role
        if (res.data.role === 'admin') {
          toast.success('Admin login successful via Google! Redirecting...', { autoClose: 1500 });
          setTimeout(() => navigate('/admin'), 1500);
        } else {
          toast.success('User login successful via Google! Redirecting...', { autoClose: 1500 });
          setTimeout(() => navigate('/users'), 1500);
        }
      } else {
        toast.error('Google login failed: Token not received');
      }
    } catch (error) {
      console.error('Google Login Error:', error); // Debugging line
      toast.error('Google login failed. Try again.');
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error('Google Login Error:', error); // Debugging line
    toast.error('Google login failed. Try again.');
  };

  return (
    <>
      <ToastContainer />
      <section className="grid max-w-screen-xl gap-8 md:grid-cols-2 md:items-center md:text-left px-10 py-5 mx-auto">
        <div className="border-blue-400 flex justify-center">
          <img className="w-full h-full rounded-lg" src={Logo} alt="Logo" />
        </div>

        <div className="md:pt-28 md:flex justify-center">
          <Card className="w-96">
            <CardHeader variant="gradient" color="blue" className="mb-4 grid h-16 place-items-center">
              <Typography variant="h3" color="white">
                Sign In
              </Typography>
            </CardHeader>

            <form onSubmit={handleSignin}>
              <CardBody className="flex flex-col gap-4">
                <Input
                  label="Email"
                  size="lg"
                  color="blue"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  label="Password"
                  size="lg"
                  color="blue"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </CardBody>

              <CardFooter className="pt-1">
                <div className="flex flex-col items-center gap-4">
                  <ReCAPTCHA
                    sitekey="6Lce83sqAAAAAKUirGeypESF-y4Ngy00yLY7I49R"
                    onChange={onChange}
                    required
                  />
                  <Button
                    variant="gradient"
                    color="blue"
                    fullWidth
                    type="submit"
                    disabled={isLoading || !isCaptchaVerified}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </div>
              </CardFooter>
            </form>

            {/* Google Auth Button */}
            <GoogleOAuthProvider clientId="739038621196-208ng4lk2r5qs69nqd0435cg6et7qc32.apps.googleusercontent.com">
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginFailure}
                />
              </div>
            </GoogleOAuthProvider>
          </Card>
        </div>
      </section>
    </>
  );
};

export default SignIn;
