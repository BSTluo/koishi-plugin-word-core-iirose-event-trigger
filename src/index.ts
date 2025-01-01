import { clone, Context, Schema } from 'koishi';
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

    const forkSession = session.bot.session(clone(session.event));

    forkSession.content = session.content;

    forkSession.content = '加入房间公屏';
    await ctx.word.driver.start(forkSession, str =>
    {
      if (!str) { return; }
      forkSession.bot.sendMessage('public:', str);
    });

    forkSession.content = '加入房间私聊';
    await ctx.word.driver.start(forkSession, str =>
    {
      if (!str) { return; }
      forkSession.bot.sendMessage(`private:${forkSession.userId}`, str);
    });

    forkSession.content = `${forkSession.userId}加入房间公屏`;
    await ctx.word.driver.start(forkSession, str =>
    {
      if (!str) { return; }
      forkSession.bot.sendMessage('public:', str);
    });

    forkSession.content = `${forkSession.userId}加入房间私聊`;
    await ctx.word.driver.start(forkSession, str =>
    {
      if (!str) { return; }
      forkSession.bot.sendMessage(`private:${forkSession.userId}`, str);
    });

    if (forkSession.userId.startsWith('X'))
    {
      forkSession.content = '游客加入房间公屏';
      await ctx.word.driver.start(forkSession, str =>
      {
        if (!str) { return; }
        forkSession.bot.sendMessage('public:', str);
      });

      forkSession.content = '游客加入房间私聊';
      await ctx.word.driver.start(forkSession, str =>
      {
        if (!str) { return; }
        forkSession.bot.sendMessage(`private:${forkSession.userId}`, str);
      });
    }
  });

  // 离开房间事件
  ctx.on('iirose/leaveRoom', async (session, data) =>
  {
    if (!session.content) { return; }
    if (session.userId == session.bot.user.id || data.uid == session.bot.user.id) { return; }

    const forkSession = session.bot.session(clone(session.event));

    forkSession.content = session.content;

    forkSession.content = '退出房间公屏';
    await ctx.word.driver.start(forkSession, str =>
    {
      if (!str) { return; }
      forkSession.bot.sendMessage('public:', str);
    });

    forkSession.content = '退出房间私聊';
    await ctx.word.driver.start(forkSession, str =>
    {
      if (!str) { return; }
      forkSession.bot.sendMessage(`private:${forkSession.userId}`, str);
    });

    forkSession.content = `${forkSession.userId}退出房间公屏`;
    await ctx.word.driver.start(forkSession, str =>
    {
      if (!str) { return; }
      forkSession.bot.sendMessage('public:', str);
    });

    forkSession.content = `${forkSession.userId}退出房间私聊`;
    await ctx.word.driver.start(forkSession, str =>
    {
      if (!str) { return; }
      forkSession.bot.sendMessage(`private:${forkSession.userId}`, str);
    });


    if (forkSession.userId.startsWith('X'))
    {
      forkSession.content = '游客退出房间公屏';
      await ctx.word.driver.start(forkSession, str =>
      {
        if (!str) { return; }
        forkSession.bot.sendMessage('public:', str);
      });

      forkSession.content = '游客退出房间私聊';
      await ctx.word.driver.start(forkSession, str =>
      {
        if (!str) { return; }
        forkSession.bot.sendMessage(`private:${forkSession.userId}`, str);
      });
    }
  });
}
