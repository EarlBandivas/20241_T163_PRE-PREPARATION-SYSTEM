const internals = {}

import calendar from "../../../models/calendar.js"

internals.get = async (req, res) => {

    
}

internals.put = async (req, res) => {

    // const duplicateSchedID = await calendar.findOne({ googleCalendarID });
    // if (duplicateSchedID) {
    //   return res.status(400).json({ message: 'duplicateSchedID' });
    // }

    
    
    try {
        const newSchedule = new calendar({ 
            googleCalendarID: req.body.googleCalendarID,
            organizer: req.body.organizer,
            created: req.body.created,
            updated: req.body.updated,
            summary: req.body.summary,
            description: req.body.description,
            creator: req.body.creator,
            start: req.body.start,
            end: req.body.end
        });
        newSchedule.save();
        res.status(200)
        .json({
          message: 'Calendar added successfully',
          response: newSchedule,
        });
        
      } catch (error) {
        res.status(500)
            .json({ 
                message: 'Error adding Calendar', error: error.message 
            });
      }
      

}

export default internals