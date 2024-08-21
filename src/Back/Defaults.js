/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class Weather_Back_Defaults {

    CLI_PREFIX = 'app';

    /* The bot command registry. */
    CMD = {
        HELP: 'help',
        SETTINGS: 'settings',
        START: 'start',
        WEATHER: 'weather',
        WHO_AM_I: 'who_am_i',
        WHO_ARE_YOU: 'who_are_you',
    };

    DATA_FILE_PID = './var/app.pid'; // PID file to stop running the bot.

    /** @type {TeqFw_Web_Back_Defaults} */
    MOD_WEB;

    /** @type {Weather_Shared_Defaults} */
    SHARED;

    /**
     *
     * @param {TeqFw_Web_Back_Defaults} MOD_WEB
     * @param {Weather_Shared_Defaults} SHARED
     */
    constructor(
        {
            TeqFw_Web_Back_Defaults$: MOD_WEB,
            Weather_Shared_Defaults$: SHARED,
        }
    ) {
        this.MOD_WEB = MOD_WEB;
        this.SHARED = SHARED;
        Object.freeze(this);
    }
}
