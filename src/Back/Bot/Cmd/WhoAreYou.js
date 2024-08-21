/**
 * The handler for 'who_are_you' command.
 */
export default class Weather_Back_Bot_Cmd_WhoAreYou {
    constructor() {
        return async (ctx) => {
            const from = ctx.message.from;
            const me = ctx.me;
            const msgDef = `
ID: *${me.id}*
First Name: *${me.first_name}*
Username: *${me.username.replaceAll('_', '\\_')}*
`;
            const msgRu = `
ID: *${me.id}*
Имя: *${me.first_name}*
Код: *${me.username.replaceAll('_', '\\_')}*
`;
            const msg = (from.language_code === 'ru') ? msgRu : msgDef;
            // https://core.telegram.org/bots/api#sendmessage
            await ctx.reply(msg, {
                parse_mode: 'MarkdownV2',
            });
        };
    }
}
