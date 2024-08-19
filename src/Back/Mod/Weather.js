/**
 * The connector to Weather API
 */
// IMPORT
import * as https from 'node:https';

// CLASSES
export default class Weather_Back_Mod_Weather {
    /**
     * @param {Weather_Back_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Core_Back_Config} config
     * @param {Weather_Back_Dto_Weather} dtoWeather
     * @param {Weather_Back_Dto_Weather_Air} dtoAir
     * @param {Weather_Back_Dto_Weather_Condition} dtoCondition
     * @param {Weather_Back_Dto_Weather_Location} dtoLocation
     */
    constructor(
        {
            Weather_Back_Defaults$: DEF,
            TeqFw_Core_Shared_Api_Logger$: logger,
            TeqFw_Core_Back_Config$: config,
            Weather_Back_Dto_Weather$: dtoWeather,
            Weather_Back_Dto_Weather_Air$: dtoAir,
            Weather_Back_Dto_Weather_Condition$: dtoCondition,
            Weather_Back_Dto_Weather_Location$: dtoLocation,
        }
    ) {
        // VARS
        /** @type {Weather_Back_Plugin_Dto_Config_Local.Dto} */
        const CFG = config.getLocal(DEF.SHARED.NAME);
        const KEY = CFG.apiKeyWeather;
        const URL = `https://api.weatherapi.com/v1/current.json?key=${KEY}&aqi=yes&q=`;

        // FUNCS
        async function fetchWeatherData(url) {
            return new Promise((resolve, reject) => {
                https.get(url, (res) => {
                    let data = '';

                    // Collect response data chunks
                    res.on('data', (chunk) => {
                        data += chunk;
                    });

                    // Handle the end of the response
                    res.on('end', () => {
                        if (res.statusCode === 200) {
                            try {
                                const parsedData = JSON.parse(data);
                                resolve(parsedData);
                            } catch (e) {
                                reject(new Error('Error parsing JSON!'));
                            }
                        } else {
                            reject(new Error(`Request failed with status code ${res.statusCode}`));
                        }
                    });

                }).on('error', (err) => {
                    reject(new Error(`Error with the request: ${err.message}`));
                });
            });
        }

        // INSTANCE METHODS
        /**
         * @param {number} lat
         * @param {number} lng
         * @return {Promise<Weather_Back_Dto_Weather.Dto>}
         */
        this.current = async function (lat, lng) {
            let res;
            console.log(`WeatherAPI_current: ${lat},${lng}.`);
            const url = URL + `${lat},${lng}`;
            const rs = await fetchWeatherData(url);
            if (rs?.current) {
                res = dtoWeather.createDto();
                res.air = dtoAir.createDto(rs.current?.air_quality);
                res.condition = dtoCondition.createDto(rs.current);
                res.location = dtoLocation.createDto(rs?.location);
                // update some combined filed
                res.condition.icon = rs.current?.condition?.icon;
                res.condition.text = rs.current?.condition?.text;
            }
            return res;
        };
    }
}
