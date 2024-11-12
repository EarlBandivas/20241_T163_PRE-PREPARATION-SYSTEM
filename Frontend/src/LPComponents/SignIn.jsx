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

// 6Lce83sqAAAAAKUirGeypESF-y4Ngy00yLY7I49R
function SignIn() {
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
              type='email'
              label='Email'
              size='lg'
              color='blue'
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type='password'
              label='Password'
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

              {/* <Button
                size='sm'
                variant='outlined'
                color='blue'
                className='flex justify-center items-center gap-3 '
                fullWidth
              >
                <img
                  src='https://docs.material-tailwind.com/icons/google.svg'
                  alt='metamask'
                  className='h-6 w-6'
                />
                Continue with Google
              </Button> */}
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

export default SignIn;
