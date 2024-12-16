const internals = {}

import dayjs from 'dayjs'
import dotenv from 'dotenv'
dotenv.config({})
import { google } from "googleapis"
// import { oauth2 } from "googleapis/build/src/apis/oauth2"
import { OAuth2Client } from 'google-auth-library'


const oauth2Clients= new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT
)


const scopes = [
    'https://www.googleapis.com/auth/calendar'
]

internals.get = (req, res) => {
    try {
        const url = oauth2Clients.generateAuthUrl({
            access_type: 'offline', 
            scope: scopes
        })
        res.redirect(url)
    } catch (error) {
        console.log(error);
        
    }
}

internals.redirect = async (req, res)=>{
    const code = req.query.code;
    const tokens = await oauth2Clients.getToken(code)
    oauth2Clients.setCredentials(tokens)
    
 
    res.send('you are logged in')
}


const calendar = google.calendar({
    version: 'v3',
    auth: process.env.API_KEY
})


internals.scheduleEvent = async (req, res) => {

    calendar.events.insert({
        calendarId:'primary',
        auth: OAuth2Client,
        requestBody: {
            summary: 'test summary',
            description: 'test description',
            start:{
                dateTime: dayjs(new Date()).add(1, 'day').toISOString(),
                timeZone: 'Asia/Manila'
            },
            end:{
                dateTime: dayjs(new Date()).add(+1, 'day').toISOString(),
                 timeZone: 'Asia/Manila'
            }
        }
    })

    res.send({
        msg: 'done',
    })
}



export default internals