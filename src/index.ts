import { Context, Schema, Session } from 'koishi';
import { } from 'koishi-plugin-word-core';
import { } from 'koishi-plugin-adapter-iirose';

export const name = 'word-core-iirose-event-trigger';
export const inject = ['word'];

export interface Config { }

export const Config: Schema<Config> = Schema.object({});

export function apply(ctx: Context) {
  if (!ctx.word) { return; }

  // 进入房间事件
  ctx.on('iirose/joinRoom', async session => {
    if (!session.content) { return; }
    if (session.userId == session.bot.user.id) { return; }

    session.content = '加入房间公屏';
    const publicMsg = await ctx.word.driver.start(session);
    session.content = '加入房间私聊';
    const privateMsg = await ctx.word.driver.start(session);

    if (publicMsg) { session.bot.sendMessage('public:', publicMsg); }
    if (privateMsg) { session.bot.sendMessage(`private:${session.userId}`, privateMsg); }
  });

  // 离开房间事件
  ctx.on('iirose/leaveRoom', async session => {
    if (!session.content) { return; }
    if (session.userId == session.bot.user.id) { return; }

    session.content = '退出房间公屏';
    const publicMsg = await ctx.word.driver.start(session);
    session.content = '退出房间私聊';
    const privateMsg = await ctx.word.driver.start(session);

    if (publicMsg) { session.bot.sendMessage('public:', publicMsg); }
    if (privateMsg) { session.bot.sendMessage(`private:${session.userId}`, privateMsg); }
  });
}
