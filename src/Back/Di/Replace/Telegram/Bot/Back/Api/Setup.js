/**
 * Display the messages about the processing of an API request.
 */
// IMPORTS
import {InlineKeyboard, Keyboard} from 'grammy';

// CLASSES
/**
 * @implements {Telegram_Bot_Back_Api_Setup}
 */
export default class Weather_Back_Di_Replace_Telegram_Bot_Back_Api_Setup {
    /**
     * @param {Weather_Back_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Weather_Back_Mod_Weather} modWeather
     * @param {Weather_Back_Bot_Cmd_Help} cmdHelp
     * @param {Weather_Back_Bot_Cmd_WhoAmI} cmdWhoAmI
     * @param {Weather_Back_Bot_Cmd_WhoAreYou} cmdWhoAreYou
     */
    constructor(
        {
            Weather_Back_Defaults$: DEF,
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Weather_Back_Mod_Weather$: modWeather,
            Weather_Back_Bot_Cmd_Help$: cmdHelp,
            Weather_Back_Bot_Cmd_WhoAmI$: cmdWhoAmI,
            Weather_Back_Bot_Cmd_WhoAreYou$: cmdWhoAreYou,
        }
    ) {
        // VARS
        const CMD = DEF.CMD;

        // INSTANCE METHODS
        this.commands = async function (bot) {

            const cmdDef = [
                {command: CMD.HELP, description: 'Display help text'},
                {command: CMD.SETTINGS, description: 'Open settings'},
                {command: CMD.START, description: 'Start the bot'},
                {command: CMD.WHO_AM_I, description: 'Info about the user'},
                {command: CMD.WHO_ARE_YOU, description: 'Info about the bot'},
                {command: CMD.WEATHER, description: 'Get the weather for your location'},
            ];
            await bot.api.setMyCommands(cmdDef);
            logger.info(`Total ${cmdDef.length} commands are set for the bot (default).`);
            const cmdRu = [
                {command: CMD.HELP, description: 'Показать справку'},
                {command: CMD.SETTINGS, description: 'Открыть настройки'},
                {command: CMD.START, description: 'Начать работу'},
                {command: CMD.WHO_AM_I, description: 'Информация о пользователе'},
                {command: CMD.WHO_ARE_YOU, description: 'Информация о боте'},
                {command: CMD.WEATHER, description: 'Прогноз погоды'},
            ];
            await bot.api.setMyCommands(cmdRu, {language_code: 'ru'});
            logger.info(`Total ${cmdRu.length} commands are set for the bot (ru).`);
            return bot;
        };

        this.handlers = function (bot) {
            bot.command(CMD.HELP, cmdHelp);
            bot.command(CMD.WHO_AM_I, cmdWhoAmI);
            bot.command(CMD.WHO_ARE_YOU, cmdWhoAreYou);

            bot.command('start', async (ctx) => {
                const inlineKeyboard = new InlineKeyboard()
                    .text('🚀 Кнопка 1', 'callback_data_1').text('🎉 Кнопка 2', 'callback_data_2') // Две кнопки в одном ряду с эмодзи
                    .row()
                    .text('📚 Кнопка 3', 'callback_data_3').text('⚙️ Кнопка 4', 'callback_data_4'); // Ещё две кнопки на новом ряду с эмодзи

                // Отправка сообщения с inline-кнопками
                await ctx.reply('Выберите действие:', {
                    reply_markup: inlineKeyboard,
                });
            });

            bot.command('weather', (ctx) => {
                const keyboard = new Keyboard()
                    .text('btn1').text('btn1').text('btn1').text('btn1').row()
                    .text('btn2').row()
                    .text('btn3').row()
                    .requestLocation('📍 Share your location')
                    // .resized()
                    .build();

                ctx.reply('I need to know your location to provide a weather in your region.', {
                    reply_markup: {
                        keyboard: keyboard,
                        one_time_keyboard: true,
                    },
                }).catch(logger.exception);
            });

            bot.on('message', async (ctx) => {
                console.log(`MSG: ` + JSON.stringify(ctx.message));
                if (ctx?.message?.location) {
                    const location = ctx.message.location;
                    const lat = location.latitude;
                    const lng = location.longitude;
                    const dto = await modWeather.current(lat, lng);
                    if (dto?.location) {
                        const air = dto.air;
                        const cond = dto.condition;
                        const loc = dto.location;
                        //
                        const EPA = ((x) => {
                            switch (x) {
                                case 1:
                                    return 'Хорошо'; //Good
                                case 2:
                                    return 'Средне'; //Moderate
                                case 3:
                                    return 'Нездорово для чувствительных'; //Unhealthy for sensitive group
                                case 4:
                                    return 'Нездорово'; //Unhealthy
                                case 5:
                                    return 'Плохо'; // Very Unhealthy
                                case 6:
                                    return 'Опасно'; //Hazardous
                                default:
                                    return 'Хрен поймёшь';
                            }
                        })(air['us-epa-index']);
                        //
                        let msg = `Вы туточки: ${loc.name}.`;
                        msg += `\nВоздух (CO2/Ozone/NO2/SO2/EPA): ${air.co}/${air.o3}/${air.no2}/${air.so2}/${EPA}.`;
                        msg += `\nТемпература: ${cond.temp_c}C; ощущается: ${cond.feelslike_c}C; жары: ${cond.heatindex_c}C.`;
                        msg += `\nВетер: ${cond.wind_kph} км/ч.`;
                        msg += `\nВлажность: ${cond.humidity}%; УФ: ${cond.uv}.`;
                        msg += `\nОблачность: ${cond.cloud} (${cond.text}).`;
                        msg += `\nДанный обновлены: ${cond.last_updated}.`;
                        ctx.reply(msg).catch(logger.exception);
                    } else {
                        ctx.reply(`I cannot get the current weather for (lat,lng): ${lat}, ${lng}`).catch(logger.exception);
                    }
                    debugger
                } else {
                    ctx.reply('This message is unknown for me :(').catch(logger.exception);
                }
            });

            // Handle the location sent by the user
            bot.on('message:location', (ctx) => {
                const location = ctx.message.location;
                const latitude = location.latitude;
                const longitude = location.longitude;
                console.log(`Here we are!!` + JSON.stringify(ctx.message));
                ctx.reply(`Thank you! I received your location.\nLatitude: ${latitude}\nLongitude: ${longitude}`)
                    .catch(logger.exception);
            });

            return bot;
        };
    }
}
