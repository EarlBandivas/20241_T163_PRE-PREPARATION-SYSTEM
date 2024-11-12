  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom'; // Import useNavigate
  import Logo from '../assets/BuksuLogo.png';
  import axios from 'axios';
  import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
  } from '@material-tailwind/react';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    // Sign in
    const handleSignin = async (e) => {
      e.preventDefault();
      setMessage('');
      setIsLoading(true);
    
      try {
        // Send login request to backend
        const response = await axios.post('http://localhost:5000/api/admin/login', {
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
          setMessage(`Login failed: ${error.response.data.message || 'Invalid credentials'}`);
          toast.error('Incorrect email or password. Please try again.');
        } else {
          setMessage('Login failed: Unable to connect to the server');
          toast.error('Unable to connect to the server. Please check your network and try again.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    

    return (
      <>
        <ToastContainer />
        <section className='grid max-w-screen-xl gap-8 md:grid-cols-2 md:items-center md:text-left px-10 py-5 mx-auto' id='signIn'>
          <div className='border-blue-400 flex justify-center'>
            <img className='w-full h-full rounded-lg' src={Logo} alt='Logo' />
          </div>

          <div className='md:pt-28 md:flex justify-center'>
            <Card className='w-96'>
              <CardHeader variant='gradient' color='blue' className='mb-4 grid h-16 place-items-center'>
                <Typography variant='h3' color='white'>
                  Sign In
                </Typography>
              </CardHeader>

              <form onSubmit={handleSignin}>
                <CardBody className='flex flex-col gap-4'>
                  <Input
                    label='Email'
                    size='lg'
                    color='blue'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input
                    label='Password'
                    size='lg'
                    color='blue'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Checkbox label='Remember Me' color='blue' />
                </CardBody>

                <CardFooter className='pt-1'>
                  <div className='flex flex-col items-center gap-4'>
                    <Button variant='gradient' color='blue' fullWidth type='submit' disabled={isLoading}>
                      {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>
                    <Button size='sm' variant='outlined' color='blue' className='flex justify-center items-center gap-3' fullWidth>
                      <img src='https://docs.material-tailwind.com/icons/google.svg' alt='Google' className='h-6 w-6' />
                      Continue with Google
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </div>
        </section>
      </> 
    );
  };

  export default SignIn;
