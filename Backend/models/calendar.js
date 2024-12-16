import mongoose from 'mongoose';

const calendarSchema = new mongoose.Schema({
    googleCalendarID: {
        type: String,
        required: true,
        // unique: true,
    },

    organizer: {
        email: {
          type: String
        //   required: true
        }  
    },
    created: {
        type: String
    },
    updated: {
        type: String,
    },
    summary: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type: String
    },
    start: {
        dateTime: {
          type: String,
        //   required: true
        },
        timeZone: {
          type: String,
        //   required: true
        }
      },
    end: {
        dateTime: {
            type: String,
            // required: true
        },
        timeZone: {
            type: String,
            // required: true
        }
    }
});

const calendar = mongoose.model('Calendar', calendarSchema);
export default calendar;
