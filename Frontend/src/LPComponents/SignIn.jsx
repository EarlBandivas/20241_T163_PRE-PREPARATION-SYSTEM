import React from 'react';
import Logo from '../assets/Buksu.png';
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

function SignIn() {
  return (
    <section
      className='grid max-w-screen-xl gap-8 md:grid-cols-2  md:items-center md:text-left  px-10 py-5 mx-auto'
      id='signIn'
    >
      <div className='  border-blue-400 flex justify-center '>
        <div>
          <img className='w-full h-110   rounded-lg ' src='' alt='' />
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
          <CardBody className='flex flex-col gap-4'>
            <Input label='Email' size='lg' />
            <Input label='Password' size='lg' />
            <div className='-ml-2.5'>
              <Checkbox label='Remember Me' />
            </div>
          </CardBody>
          <CardFooter className='pt-1 '>
            <div className='flex flex-col items-center gap-4'>
              <Button variant='gradient' color='blue' fullWidth>
                Sign In
              </Button>
              <Button
                size='sm'
                variant='outlined'
                color='blue-gray'
                className='flex justify-center items-center gap-3 '
                fullWidth
              >
                <img
                  src='https://docs.material-tailwind.com/icons/google.svg'
                  alt='metamask'
                  className='h-6 w-6'
                />
                Continue with Google
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

export default SignIn;
