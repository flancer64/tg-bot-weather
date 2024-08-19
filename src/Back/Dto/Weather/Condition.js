/**
 * DTO to represent air quality data in Weather API response.
 *
 * This combined structure is not the same as in the API response.
 */
// MODULE'S VARS
const NS = 'Weather_Back_Dto_Weather_Condition';

// MODULE'S CLASSES
/**
 * @memberOf Weather_Back_Dto_Weather_Condition
 */
class Dto {
    static namespace = NS;
    /** @type {number} - 0,1,... */
    cloud;
    /** @type {number} */
    feelslike_c;
    /** @type {number} */
    heatindex_c;
    /** @type {number} */
    humidity;
    /** @type {string} */
    icon;
    /** @type {string} */
    last_updated;
    /** @type {number} */
    last_updated_epoch;
    /** @type {number} */
    temp_c;
    /** @type {string} - Sunny, ... */
    text;
    /** @type {number} */
    uv;
    /** @type {number} */
    wind_kph;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Weather_Back_Dto_Weather_Condition {

    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        /**
         * @param {Weather_Back_Dto_Weather_Condition.Dto} [data]
         * @return {Weather_Back_Dto_Weather_Condition.Dto}
         */
        this.createDto = function (data) {
            // create new DTO
            const res = new Dto();
            // cast known attributes
            res.cloud = cast.int(data?.cloud);
            res.feelslike_c = cast.decimal(data?.feelslike_c);
            res.heatindex_c = cast.decimal(data?.heatindex_c);
            res.humidity = cast.decimal(data?.humidity);
            res.icon = cast.string(data?.icon);
            res.last_updated = cast.string(data?.last_updated);
            res.last_updated_epoch = cast.int(data?.last_updated_epoch);
            res.temp_c = cast.decimal(data?.temp_c);
            res.text = cast.string(data?.text);
            res.uv = cast.decimal(data?.uv);
            res.wind_kph = cast.decimal(data?.wind_kph);
            return res;
        };
    }
}