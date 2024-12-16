import { useState } from 'react';
import { gapi } from 'gapi-script';

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
// import {
//   // initGoogleCalendar,
//   addEventToGoogleCalendar,
//   createEventObject,
// } from './googleCalendar';

import CalendarAlert from './CalendarAlert';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_API_KEY;
const SCOPES = import.meta.env.VITE_SCOPES;

const saveResponse = async (res) => {
  try {
    console.log(res);
    await fetch('http://localhost:5000/api/google/calendar/schedule-event', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: res,
    });
  } catch (err) {
    console.log(err);
  }
  // console.log('sendData');
  // console.log(res);
  // return response.json();
};

const initGoogleCalendar = () => {
  return new Promise((resolve, reject) => {
    gapi.load('client:auth2', () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: [import.meta.env.VITE_DISCOVERY_DOC],
          scope: SCOPES,
          plugin_name: import.meta.env.PLUGIN_NAME,
        })
        .then(() => {
          console.log('Initialization complete');

          resolve(); // Initialization complete
        })
        .catch((error) => {
          reject(error); // Handle initialization failure
        });
    });
  });
};

const addEventToGoogleCalendar = async (eventData) => {
  try {
    // console.log(eventData);

    // const eventDetails = {
    //   summary: "Meeting with Client",
    //   location: "123 Main St, Anywhere, USA",
    //   description: "Discuss project updates and next steps.",
    //   start: {
    //     dateTime: "2024-12-05T10:00:00-05:00",
    //     timeZone: "America/New_York",
    //   },
    //   end: {
    //     dateTime: "2024-12-05T11:00:00-05:00",
    //     timeZone: "America/New_York",
    //   },
    // };
    // const isSignedIn = await gapi.auth2.getAuthInstance().isSignedIn.get();
    // console.log(isSignedIn);

    // if (!isSignedIn) {
    //   await gapi.auth2.getAuthInstance().signIn();
    // }

    await initGoogleCalendar(); // Wait for initialization
    // console.log('efwefw');

    const response = await gapi.client.calendar.events
      .insert({
        calendarId: 'primary',
        resource: eventData,
      })
      .then((res) => {
        const req = res.result;
        // console.log(req);

        const data = {
          googleCalendarID: req.id,
          organizer: req.organizer.email,
          created: req.created,
          updated: req.updated,
          summary: req.summary,
          description: req.description,
          creator: req.creator.id,
          start: req.start,
          end: req.end,
        };
        saveResponse(JSON.stringify(data));
      });
    return response;
  } catch (error) {
    console.error('Error adding event to Google Calendar:', error);
  }
};

const createEventObject = (title, startDate, endDate, description) => ({
  summary: title,
  description: description,
  start: {
    dateTime: new Date(startDate).toISOString(),
    timeZone: 'Asia/Manila',
  },
  end: {
    dateTime: new Date(endDate).toISOString(),
    timeZone: 'Asia/Manila',
  },
});

// eslint-disable-next-line react/prop-types
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
