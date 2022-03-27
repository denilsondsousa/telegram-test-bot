import { Context, Markup, Telegraf } from 'telegraf';
import { Update } from 'typegram';

const bot: Telegraf<Context<Update>> = new Telegraf(process.env.BOT_TOKEN as string);

bot.start((ctx) => { `Olá ${ctx.from.first_name}!` })

bot.help((ctx) => {
    ctx.reply('Mande /send para receber um cumprimento');
    ctx.reply('Mande /keyboard para recever uma menssagem com keyboard');
    ctx.reply('Mande /quit para parar o bot!');
})

bot.command('quit', (ctx) => {
    ctx.telegram.leaveChat(ctx.message.chat.id);

    ctx.leaveChat();
});

bot.command('keyboard', (ctx) => {
    ctx.reply('Keyboard', Markup.inlineKeyboard([
        Markup.button.callback('Primeira opção', 'first'),
        Markup.button.callback('Segunda opção', 'second')
    ]))
})

bot.on('text', (ctx) => {
    ctx.reply(`Você escolheu a ${ctx.message.text === 'first' ? 'Primeira' : 'Segunda'} opção!`)
})

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

