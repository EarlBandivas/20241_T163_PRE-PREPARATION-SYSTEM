import React from 'react';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';

function Cards() {
  return (
    <div
      className='container flex flex-wrap items-center justify-center mx-auto text-slate-800 m-24 h-full gap-6 text-center p-20'
      id='contactUs'
    >
      <Card className='mt-6 w-96'>
        <CardHeader color='white' className='relative h-56'>
          <div className='flex justify-center p-1'>
            <img
              className='h-52 w-52 rounded-full object-cover object-center'
              src='https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
              alt='card-image'
            />
          </div>
        </CardHeader>
        <CardBody>
          <Typography variant='h5' color='blue-gray' className='mb-2'>
            Profile 1
          </Typography>
          <Typography>
            The place is close to Barceloneta Beach and bus stop just 2 min by
            walk and near to &quot;Naviglio&quot; where you can enjoy the main
            night life in Barcelona.
          </Typography>
        </CardBody>
        <CardFooter className='pt-0'>
          <Button>Contact Us</Button>
        </CardFooter>
      </Card>
      <Card className='mt-6 w-96'>
        <CardHeader color='white' className='relative h-56'>
          <div className='flex justify-center p-1'>
            <img
              className='h-52 w-52 rounded-full object-cover object-center'
              src='https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
              alt='card-image'
            />
          </div>
        </CardHeader>
        <CardBody>
          <Typography variant='h5' color='blue-gray' className='mb-2'>
            Profile 2
          </Typography>
          <Typography>
            The place is close to Barceloneta Beach and bus stop just 2 min by
            walk and near to &quot;Naviglio&quot; where you can enjoy the main
            night life in Barcelona.
          </Typography>
        </CardBody>
        <CardFooter className='pt-0'>
          <Button>Contact Us</Button>
        </CardFooter>
      </Card>
      <Card className='mt-6 w-96 '>
        <CardHeader color='white' className='relative h-56'>
          <div className='flex justify-center p-1'>
            <img
              className='h-52 w-52 rounded-full object-cover object-center'
              src='https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
              alt='card-image'
            />
          </div>
        </CardHeader>
        <CardBody>
          <Typography variant='h5' color='blue-gray' className='mb-2'>
            Profile 3
          </Typography>
          <Typography>
            The place is close to Barceloneta Beach and bus stop just 2 min by
            walk and near to &quot;Naviglio&quot; where you can enjoy the main
            night life in Barcelona.
          </Typography>
        </CardBody>
        <CardFooter className='pt-0'>
          <Button>Contact Us</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Cards;
