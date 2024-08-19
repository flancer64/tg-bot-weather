/**
 * DTO to represent air quality data in Weather API response.
 */
// MODULE'S VARS
const NS = 'Weather_Back_Dto_Weather_Air';

// MODULE'S CLASSES
/**
 * @memberOf Weather_Back_Dto_Weather_Air
 */
class Dto {
    static namespace = NS;

    /** @type {number} - Carbon Monoxide (μg/m3) */
    co;
    /** @type {number} - Ozone (μg/m3) */
    o3;
    /** @type {number} - Nitrogen dioxide (μg/m3) */
    no2;
    /** @type {number} - Sulphur dioxide (μg/m3) */
    so2;
    /** @type {number} - PM2.5 (μg/m3) */
    pm2_5;
    /** @type {number} - PM10 (μg/m3) */
    pm10;
    /**
     * US - EPA standard.
     * 1 means Good
     * 2 means Moderate
     * 3 means Unhealthy for sensitive group
     * 4 means Unhealthy
     * 5 means Very Unhealthy
     * 6 means Hazardous
     *
     * @type {number}
     */
    'us-epa-index';
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Weather_Back_Dto_Weather_Air {

    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        /**
         * @param {Weather_Back_Dto_Weather_Air.Dto} [data]
         * @return {Weather_Back_Dto_Weather_Air.Dto}
         */
        this.createDto = function (data) {
            // create new DTO
            const res = new Dto();
            // cast known attributes
            res.co = cast.decimal(data?.co);
            res.no2 = cast.decimal(data?.no2);
            res.o3 = cast.decimal(data?.o3);
            res.pm10 = cast.decimal(data?.pm10);
            res.pm2_5 = cast.decimal(data?.pm2_5);
            res.so2 = cast.decimal(data?.so2);
            res['us-epa-index'] = cast.int(data?.['us-epa-index']);
            return res;
        };
    }
}