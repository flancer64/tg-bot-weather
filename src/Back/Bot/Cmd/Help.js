/**
 * The handler for 'help' command.
 */
export default class Weather_Back_Bot_Cmd_Help {
    constructor() {
        return async (ctx) => {
            const from = ctx.message.from;
            const msgDef = `
This is a test bot for demo\\.

Available commands are:

[/help](/help) \\- display this text\\. 
[/settings](/settings) \\- configure this bot\\. 
[/start](/start) \\- start the bot\\. 
[/weather](/weather) \\- display the weather for your location\\. 
[/who\\_am\\_i](/who\\_am\\_i) \\- display the info about you\\. 
[/who\\_are\\_you](/who\\_are\\_you) \\- display the info about me\\. 
`;
            const msgRu = `
Это тестовый бот\\.

Доступные команды:

[/help](/help) \\- вывести этот текст\\. 
[/settings](/settings) \\- настройка бота\\. 
[/start](/start) \\- начало работы\\. 
[/weather](/weather) \\- показать погоду для текущего местоположения\\. 
[/who\\_am\\_i](/who\\_am\\_i) \\- показать информацию о тебе\\. 
[/who\\_are\\_you](/who\\_are\\_you) \\- показать информацию обо мне\\. 
`;
            const msg = (from.language_code === 'ru') ? msgRu : msgDef;
            // https://core.telegram.org/bots/api#sendmessage
            await ctx.reply(msg, {
                parse_mode: 'MarkdownV2',
            });
        };
    }
}
