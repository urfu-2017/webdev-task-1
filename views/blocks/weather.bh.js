'use strict';

const icons = {
    'snow': 'sn',
    'sleet': 'sl',
    'hail': 'h',
    'thunderstorm': 't',
    'heavy rain': 'hr',
    'light rain': 'lr',
    'showers': 's',
    'heavy cloud': 'hc',
    'light cloud': 'lc',
    'clear': 'c'
};
const iconsUrl = 'https://www.metaweather.com/static/img/weather/';

module.exports = bh => bh.match('weather', (ctx, json) => {
    ctx.tag('section');

    if (json.data.error) {
        ctx.content({
            elem: 'error',
            content: json.data.error
        });

        return;
    }

    const { city, days } = json.data;
    const [current, ...other] = days;

    ctx.content([
        {
            elem: 'city',
            content: city
        },
        {
            elem: 'icon_state',
            tag: 'img',
            attrs: {
                alt: current.state,
                src: iconsUrl + icons[current.state.toLocaleLowerCase()] + '.svg'
            }
        },
        {
            elem: 'data',
            content: [
                {
                    elem: 'temperature',
                    content: 'Temperature: ' + current.temp.toFixed(0) + ' &#8451;'
                },
                {
                    elem: 'wind_speed',
                    content: 'Wind speed: ' + current.windSpeed.toFixed(2) + ' m/s'
                },
                {
                    elem: 'days',
                    content: other.map(getDayElem)
                }
            ]
        }
    ]);
});

function getDayElem(data) {
    const day = ('0' + data.date.getUTCDate()).slice(-2);
    const month = ('0' + (data.date.getUTCMonth() + 1)).slice(-2);

    return {
        elem: 'day',
        content: [
            {
                elem: 'day_date',
                content: `${day}.${month}`
            },
            {
                elem: 'day_value',
                content: data.temp.toFixed(0) + ' &#8451;'
            },
            {
                elem: 'day_value',
                content: data.windSpeed.toFixed(2) + ' m/s'
            }
        ]
    };
}
