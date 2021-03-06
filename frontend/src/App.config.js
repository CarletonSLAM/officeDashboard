const ONE_SECOND = 1000
const ONE_MINUE = ONE_SECOND * 60
const ONE_HOUR = ONE_MINUE * 60

const SERVICES = {
    TRANSPO: 'transpo',
    OPENWEATHERMAP: 'openweathermap',
    CALENDAR: 'calendar',
    GALLERY: 'gallery',
    FACEBOOK: 'facebook',
    TWITTER: 'twitter',
    INSTAGRAM: 'instagram',
    INFO: 'info'
}

module.exports = {
    appName: 'IEEE Carleton Dashboard',
    serverURL: `${process.env.REACT_APP_BACKEND_URL || window.location.origin}`,
    layout: [
        {
            h: 0.84,
            w: 1,
            layout: [
                {
                    w: 0.33,
                    h: 1,
                    layout: [
                        {
                            w: 1,
                            h: 0.5,
                            tile: SERVICES.INSTAGRAM
                        },
                        {
                            w: 1,
                            h: 0.5,
                            tile: SERVICES.TWITTER
                        }
                    ]
                },
                {
                    w: 0.33,
                    h: 1,
                    layout: [
                        {
                            w: 1,
                            h: 0.4,
                            tile: SERVICES.INFO
                        },
                        {
                            w: 1,
                            h: 0.6,
                            tile: SERVICES.GALLERY
                        }
                    ]
                },
                {
                    w: 0.33,
                    h: 1,
                    tile: SERVICES.CALENDAR
                }
            ]
        },
        {
            h: 0.16,
            w: 1,
            layout: [
                {
                    w: 0.5,
                    h: 1,
                    tile: SERVICES.TRANSPO
                },
                {
                    w: 0.5,
                    h: 1,
                    tile: SERVICES.OPENWEATHERMAP
                }
            ]
        }
    ],
    services: [
        {
            name: SERVICES.TRANSPO,
            timeout: 5 * ONE_MINUE,
            config: {
                stops: [ '5813' ]
            }
        },
        {
            name: SERVICES.OPENWEATHERMAP,
            timeout: ONE_HOUR,
            config: {
                location: 'Ottawa,ca',
                units: 'metric'
            }
        },
        {
            name: SERVICES.CALENDAR,
            timeout: ONE_HOUR,
            config: {
                calID: 'ieee.carleton.ca_0oehshcagcul0e8pe5e9fie70s@group.calendar.google.com'
            }
        },
        {
            name: SERVICES.GALLERY,
            timeout: 4 * ONE_HOUR,
            config: {
                folderID: '1aWcL4Wc7lOQuSI1-fZ2gX49__n0uwpuX'
            }
        },
        {
            name: SERVICES.TWITTER,
            timeout: ONE_HOUR / 4,
            config: {
                account: 'ieeecu',
                count: 10
            }
        },
        {
            name: SERVICES.INSTAGRAM,
            timeout: ONE_HOUR,
            config: {
                account: 'ieeeorg',
                count: 10
            }
         }
    ]
}
