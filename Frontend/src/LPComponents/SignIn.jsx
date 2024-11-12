import React from 'react';
import Logo from '../assets/BuksuLogo.png';
import { useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from '@material-tailwind/react';
import theme from '@material-tailwind/react/theme';

//
//6Lce83sqAAAAAKUirGeypESF-y4Ngy00yLY7I49R
function SignIn() {
  const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
  }; // Initi
  const onChange = () => {
    setIsCaptchaVerified(true);
  };

  const google = window.google;
  const handleCallbackResponse = (response) => {
    console.log('Encoded JWT ID token: ', response.credential);
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        '863437018339-ervi46asct1gs4d1t2tjuuf6fms4vo8q.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById('signin-in-div'), {
      theme: 'outlined',
      size: 'large',
    });
  }, []);

  const handleSignin = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      // Send login request to backend
      const response = await axios.post('http://localhost:5000/admin/login', {
        email,
        password,
      });

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token); // Store token in localStorage
        setMessage('Login successful! Redirecting...');
        toast.success('Login successful! Redirecting...', { autoClose: 1500 });

        setTimeout(() => {
          navigate('/admin'); // Redirect to MainPage after successful login
        }, 1500);
      } else {
        setMessage('Login failed: Token not received');
        toast.error('Login failed. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        setMessage(
          `Login failed: ${error.response.data.message || 'Invalid credentials'}`
        );
        toast.error('Incorrect email or password. Please try again.');
      } else {
        setMessage('Login failed: Unable to connect to the server');
        toast.error(
          'Unable to connect to the server. Please check your network and try again.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className='grid max-w-screen-xl gap-8 md:grid-cols-2  md:items-center md:text-left  px-10 py-5 mx-auto'
      id='signIn'
    >
      <div className='  border-blue-400 flex justify-center '>
        <div>
          <img className='w-full h-full   rounded-lg ' src={Logo} alt='' />
        </div>
      </div>
      <div className='md: pt-28 md: flex justify-center'>
        <Card className='w-96 '>
          <CardHeader
            variant='gradient'
            color='blue'
            className='mb-4 grid h-16 place-items-center'
          >
            <Typography variant='h3' color='white'>
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className='flex flex-col gap-3'>
            <Input
              type=''
              label='Email'
              size='lg'
              color='blue'
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type='password'
              label='password'
              size='lg'
              color='blue'
              onChange={(e) => setPassword(e.target.value)}
            />
          </CardBody>
          <CardFooter className='pt-1 '>
            <div className='flex flex-col items-center gap-4'>
              <ReCAPTCHA
                sitekey='6Lce83sqAAAAAKUirGeypESF-y4Ngy00yLY7I49R'
                onChange={onChange}
                required
              />
              <Button
                variant='gradient'
                color='blue'
                fullWidth
                // onClick={handleLogin}
              >
                Sign In
              </Button>
              <div id='signin-in-div'></div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

export default SignIn;
