import React, { useState } from 'react';
import {
  Typography,
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from '@material-tailwind/react';
import {
  initGoogleCalendar,
  addEventToGoogleCalendar,
  createEventObject,
} from './googleCalendar';

import CalendarAlert from './CalendarAlert';

const CalendarModal = ({ isOpen, onClose }) => {
  const [alert, setAlert] = useState(null);

  const [eventData, setEventData] = useState({
    title: '',
    startDate: '',
    description: '',
    endDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSaveEvent = async () => {
    const { title, startDate, description, endDate } = eventData;
    const googleEvent = createEventObject(
      title,
      startDate,
      endDate,
      description
    );

    try {
      const response = await addEventToGoogleCalendar(googleEvent);
      if (response?.status === 200) {
        //alert('Event added to Google Calendar!');
        setAlert({
          type: 'success',
          message: 'Event added to Google Calendar!',
        });
      }
    } catch (error) {
      console.error(error);
      setAlert({
        type: 'error',
        message: 'Unable to add event to Google Calendar',
      });
    } finally {
      onClose(); // Close the modal
    }
  };

  return (
    <>
      <Dialog open={isOpen} handler={onClose} size='sm'>
        <DialogHeader className='flex flex-col items-start'>
          <Typography className='mb-1 text-center' variant='h4'>
            Add Event
          </Typography>
        </DialogHeader>
        <DialogBody className='flex justify-center'>
          <div className='flex w-80 flex-col gap-6'>
            <Input
              variant='static'
              label='Event Title'
              name='title'
              value={eventData.title}
              onChange={handleChange}
              color='blue'
              required
            />
            <Input
              label='Event Starting Date'
              name='startDate'
              type='date'
              value={eventData.startDate}
              onChange={handleChange}
              required
            />
            <Textarea
              label='Event Description'
              name='description'
              value={eventData.description}
              onChange={handleChange}
              color='blue'
              required
            />
            <Input
              label='End Date'
              name='endDate'
              type='date'
              value={eventData.endDate}
              onChange={handleChange}
              color='blue'
              required
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <div className='grid grid-cols-2 gap-3'>
            <Button onClick={onClose} variant='gradient' color='red'>
              Close
            </Button>
            <Button variant='gradient' color='green' onClick={handleSaveEvent}>
              Save Event
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
      {alert && (
        <CalendarAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)} // Clear alert on close
        />
      )}
    </>
  );
};

export default CalendarModal;
