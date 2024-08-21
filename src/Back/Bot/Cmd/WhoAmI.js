/**
 * The handler for 'who_am_i' command.
 */
export default class Weather_Back_Bot_Cmd_WhoAmI {
    constructor() {
        return async (ctx) => {
            const from = ctx.message.from;
            const msgDef = `
ID: *${from.id}*
First Name: *${from.first_name}*
Last Name: *${from.last_name}*
Username: *${from.username}*
Language: *${from.language_code}*
`;
            const msgRu = `
ID: *${from.id}*
Имя: *${from.first_name}*
Фамилия: *${from.last_name}*
Пользователь: *${from.username}*
Язык: *${from.language_code}*
`;
            const msg = (from.language_code === 'ru') ? msgRu : msgDef;
            // https://core.telegram.org/bots/api#sendmessage
            await ctx.reply(msg, {
                parse_mode: 'MarkdownV2',
            });
        };
    }
}
