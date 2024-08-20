import { Context, Schema } from 'koishi';
import { } from 'koishi-plugin-word-core';
import { } from 'koishi-plugin-adapter-iirose';

export const name = 'word-core-iirose-event-trigger';
export const inject = ['word'];

export interface Config { }

export const Config: Schema<Config> = Schema.object({});

export function apply(ctx: Context)
{
  if (!ctx.word) { return; }

  // 进入房间事件
  ctx.on('iirose/joinRoom', async (session, data) =>
  {
    if (!session.content) { return; }
    if (session.userId == session.bot.user.id || data.uid == session.bot.user.id) { return; }

    session.content = '加入房间公屏';
    await ctx.word.driver.start(session, str =>
    {
      if (!str) { return; }
      session.bot.sendMessage('public:', str);
    });

    session.content = '加入房间私聊';
    await ctx.word.driver.start(session, str =>
    {
      if (!str) { return; }
      session.bot.sendMessage(`private:${session.userId}`, str);
    });

    session.content = `${session.userId}加入房间公屏`;
    await ctx.word.driver.start(session, str =>
    {
      if (!str) { return; }
      session.bot.sendMessage('public:', str);
    });

    session.content = `${session.userId}加入房间私聊`;
    await ctx.word.driver.start(session, str =>
    {
      if (!str) { return; }
      session.bot.sendMessage(`private:${session.userId}`, str);
    });

    if (session.userId.startsWith('X'))
    {
      session.content = '游客加入房间公屏';
      await ctx.word.driver.start(session, str =>
      {
        if (!str) { return; }
        session.bot.sendMessage('public:', str);
      });

      session.content = '游客加入房间私聊';
      await ctx.word.driver.start(session, str =>
      {
        if (!str) { return; }
        session.bot.sendMessage(`private:${session.userId}`, str);
      });
    }
  });

  // 离开房间事件
  ctx.on('iirose/leaveRoom', async (session, data) =>
  {
    if (!session.content) { return; }
    if (session.userId == session.bot.user.id || data.uid == session.bot.user.id) { return; }

    session.content = '退出房间公屏';
    await ctx.word.driver.start(session, str =>
    {
      if (!str) { return; }
      session.bot.sendMessage('public:', str);
    });

    session.content = '退出房间私聊';
    await ctx.word.driver.start(session, str =>
    {
      if (!str) { return; }
      session.bot.sendMessage(`private:${session.userId}`, str);
    });

    session.content = `${session.userId}退出房间公屏`;
    await ctx.word.driver.start(session, str =>
    {
      if (!str) { return; }
      session.bot.sendMessage('public:', str);
    });

    session.content = `${session.userId}退出房间私聊`;
    await ctx.word.driver.start(session, str =>
    {
      if (!str) { return; }
      session.bot.sendMessage(`private:${session.userId}`, str);
    });


    if (session.userId.startsWith('X'))
    {
      session.content = '游客退出房间公屏';
      await ctx.word.driver.start(session, str =>
      {
        if (!str) { return; }
        session.bot.sendMessage('public:', str);
      });

      session.content = '游客退出房间私聊';
      await ctx.word.driver.start(session, str =>
      {
        if (!str) { return; }
        session.bot.sendMessage(`private:${session.userId}`, str);
      });
    }
  });
}
