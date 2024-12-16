import "react-big-calendar/lib/css/react-big-calendar.css"
import { Typography } from '@material-tailwind/react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import moment from 'moment'
// const localizer = momentLocalizer(moment)


const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})



const events = [
  {
    start: moment('2024-12-05T00:00:00Z').toDate(),
    end:moment('2024-12-05T00:00:00Z').toDate(),
    title: 'rewsresr rewsresr rewsresr rewsresr rewsresr'
  },
  {
    start: moment('2024-12-06T00:00:00Z').toDate(),
    end:moment('2024-12-07T00:00:00Z').toDate(),
    title: '234'
  },
  
]

function Event() {
  
  return (
    <>
      <Typography>
        <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 800 }}
      />
      </Typography>
    </>
  );
}

export default Event;
