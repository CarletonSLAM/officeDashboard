
/* global gapi atob */

import moment from 'moment'
import fetch from 'cross-fetch'
import AppConfig from '../../App.config'
import { generateHeaders } from '../helpers'

const calculateEventDuration = (start, end) => {
    if (start.format('l') === end.format('l')) {
        return start.format('dddd, MMM Do[:] h:mm A [-] ') + end.format('h:mm A')
    }
    return start.format('dddd, MMM Do[:] h:mm A [-] ') + end.format('dddd, MMM Do[:] h:mm A')
}

export default {
    getData: () => new Promise((resolve, reject) => fetch(`${AppConfig.server}/google`, { headers: generateHeaders() }).then(
        response => response.json(),
        error => error,
    ).then((response) => {
        if (!response.success) return
        const creds = JSON.parse(atob(response.data))
        gapi.load('client', () => {
            gapi.client.init(creds.client).then(() => gapi.client.calendar.events.list({
                calendarId: creds.calID,
                timeMin: (new Date()).toISOString(),
                showDeleted: false,
                singleEvents: true,
                maxResults: 15,
                orderBy: 'startTime'
            })).then(
                res => resolve(res.result),
                error => reject(error.result.error.message),
            )
        })
    })),
    transformResponse: response => response.items.map(({
        summary, start, end, description, location
    }) => ({
        summary,
        start: start.dateTime,
        duration: calculateEventDuration(moment(start.dateTime), moment(end.dateTime)),
        description,
        location
    }))
}
