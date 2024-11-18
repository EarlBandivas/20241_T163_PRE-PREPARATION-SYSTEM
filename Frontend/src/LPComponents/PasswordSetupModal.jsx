import React, { useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
} from '@material-tailwind/react';
import axios from 'axios';

const PasswordSetupModal = ({ open, handleOpen, verificationToken }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/admin/set-password',
        {
          token: verificationToken,
          password,
        }
      );

      setSuccessMessage(response.data.message || 'Password set successfully!');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      className='grid grid-cols-1 place-items-center'
    >
      <DialogHeader>Set Your Password</DialogHeader>
      <DialogBody>
        {successMessage ? (
          <p className='text-green-500 text-sm'>{successMessage}</p>
        ) : (
          <>
            <div className='w-72 m-4'>
              <Input
                type='password'
                label='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
              />
            </div>
            <div className='w-72 m-4'>
              <Input
                type='password'
                label='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Confirm your password'
              />
            </div>
            {errorMessage && (
              <p className='text-red-500 text-sm'>{errorMessage}</p>
            )}
          </>
        )}
      </DialogBody>
      <DialogFooter>
        {!successMessage && (
          <>
            <Button
              variant='text'
              color='red'
              onClick={() => handleOpen(false)}
              className='mr-1'
            >
              <span>Cancel</span>
            </Button>
            <Button variant='gradient' color='green' onClick={handleSubmit}>
              <span>Submit</span>
            </Button>
          </>
        )}
      </DialogFooter>
    </Dialog>
  );
};

export default PasswordSetupModal;
