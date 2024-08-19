/**
 * DTO to represent location structure in Weather API response.
 */
// MODULE'S VARS
const NS = 'Weather_Back_Dto_Weather_Location';

// MODULE'S CLASSES
/**
 * @memberOf Weather_Back_Dto_Weather_Location
 */
class Dto {
    static namespace = NS;
    /** @type {string} */
    country;
    /** @type {number} */
    lat;
    /** @type {number} */
    lon;
    /** @type {string} */
    name;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Weather_Back_Dto_Weather_Location {

    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        /**
         * @param {Weather_Back_Dto_Weather_Location.Dto} [data]
         * @return {Weather_Back_Dto_Weather_Location.Dto}
         */
        this.createDto = function (data) {
            // create new DTO
            const res = new Dto();
            // cast known attributes
            res.country = cast.string(data?.country);
            res.lat = cast.decimal(data?.lat);
            res.lon = cast.decimal(data?.lon);
            res.name = cast.string(data?.name);
            return res;
        };
    }
}