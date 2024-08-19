/**
 * DTO to represent result structure in Weather API response.
 */
// MODULE'S VARS
const NS = 'Weather_Back_Dto_Weather';

// MODULE'S CLASSES
/**
 * @memberOf Weather_Back_Dto_Weather
 */
class Dto {
    static namespace = NS;
    /** @type {Weather_Back_Dto_Weather_Air.Dto} */
    air;
    /** @type {Weather_Back_Dto_Weather_Condition.Dto} */
    condition;
    /** @type {Weather_Back_Dto_Weather_Location.Dto} */
    location;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Weather_Back_Dto_Weather {

    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {Weather_Back_Dto_Weather_Air} dtoAir
     * @param {Weather_Back_Dto_Weather_Condition} dtoCondition
     * @param {Weather_Back_Dto_Weather_Location} dtoLocation
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
            Weather_Back_Dto_Weather_Air$: dtoAir,
            Weather_Back_Dto_Weather_Condition$: dtoCondition,
            Weather_Back_Dto_Weather_Location$: dtoLocation,
        }
    ) {
        /**
         * @param {Weather_Back_Dto_Weather.Dto} [data]
         * @return {Weather_Back_Dto_Weather.Dto}
         */
        this.createDto = function (data) {
            // create new DTO
            const res = new Dto();
            // cast known attributes
            res.air = dtoAir.createDto(data?.air);
            res.condition = dtoCondition.createDto(data?.condition);
            res.location = dtoLocation.createDto(data?.location);
            return res;
        };
    }
}