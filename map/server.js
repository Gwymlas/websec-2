const express = require('express');
const cors = require('cors');
const axios = require('axios');
const sha1 = require('js-sha1');
const libxmljs = require("libxmljs")


const app = express();

app.use(cors());
app.use(express.json());

let stopData = {};

const getStopData = async () => {
    axios.get('https://tosamara.ru/api/v2/classifiers/stopsFullDB.xml', 
    {"Content-Type": "application/xml; charset=utf-8"}).
        then(res => {
            const dataFromXml = libxmljs.parseXml(res.data);
            
            let busStopsValue = []
            dataFromXml.childNodes().forEach(stop => {
                var obj = {};
                stop.childNodes().forEach(tag => {obj[tag.name()] = tag.text()});
                // console.log(tag.name(), tag.text()
                // console.log(obj);
                busStopsValue.push(obj);
            });

            stopData = {busStopsValue};
        })
}

const getFirstArrivalToStop = async (ks_id) => {
    let authkey = sha1(ks_id + "just_f0r_tests");
    let url = `https://tosamara.ru/api/v2/json?method=getFirstArrivalToStop&KS_ID=${ks_id}&os=android&clientid=test&authkey=${authkey}`;
    const data = await axios.get(url).then(response => response.data.arrival);
    // console.log(result);

    let result = []
    data.forEach(arrival => {
        let obj = {"type": arrival["type"], 
                    "number": arrival["number"],
                    "time": arrival["time"],
                    "hullNo": arrival["hullNo"]
                    };
        result.push(obj);
    });

    return {result};
}


const getTransportPosition = async (hullno) => {
    let authkey = sha1(hullno + "just_f0r_tests");
    let url = `https://tosamara.ru/api/v2/json?method=getTransportPosition&HULLNO=${hullno}&os=android&clientid=test&authkey=${authkey}`;
    const data = await axios.get(url).then(response => response.data);
    let result = {"nextStops": data["nextStops"],
                  "longitude": data["longitude"],
                  "latitude": data["latitude"]
                }
    return result;
}


const getStopById = async (id) => {
    let result = {};


    if (Object.keys(stopData).length !== 0) {
        stopData["busStopsValue"].forEach(stop => {
                if (stop["KS_ID"] === id) {
                    result = stop;
                }
            });
    }
    
    return result;
    
}


const getStopsCoord = () => {
    let stops = [];

    stopData["busStopsValue"].forEach(stop => {
        let obj = { "KS_ID": stop["KS_ID"],
                    "title": stop["title"],
                    "latitude": stop["latitude"],
                    "longitude": stop["longitude"] };
        stops.push(obj);
    })

    return {stops};
}


getStopData();

app.get('/getStopData', (req, res) => {
    res.send(stopData);
});

app.get('/getStopsCoord', (req, res) => {
    res.send(getStopsCoord());
});

app.get('/getFirstArrivalToStop', (req, res) => {
    const ks_id = req.query.KS_ID;
    getFirstArrivalToStop(ks_id).then(result => res.send(result));
})

app.get('/getTransportPosition', (req, res) => {
    const hullno = req.query.hullNo;
    getTransportPosition(hullno).then(result => res.send(result));
})

app.get('/getStopById', (req, res) => {
    const ks_id = req.query.KS_ID;
    getStopById(ks_id).then(result => res.send(result));
})


const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});