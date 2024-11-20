import { gapi } from 'gapi-script';

const CLIENT_ID =
  '863437018339-ervi46asct1gs4d1t2tjuuf6fms4vo8q.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBeH6t4l0ClQYn-YnxDTiSIyjcuCaQslfk';
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

export const initGoogleCalendar = () => {
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: [
        'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
      ],
      scope: SCOPES,
    });
  });
};

export const addEventToGoogleCalendar = async (eventData) => {
  try {
    const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
    if (!isSignedIn) {
      await gapi.auth2.getAuthInstance().signIn();
    }
    const response = await gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: eventData,
    });
    return response;
  } catch (error) {
    console.error('Error adding event to Google Calendar:', error);
  }
};

export const createEventObject = (title, startDate, endDate, description) => ({
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
