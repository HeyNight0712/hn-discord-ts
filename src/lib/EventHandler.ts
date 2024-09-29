import {ClientEvents} from "discord.js";


export interface EventHandler {
    eventName: keyof ClientEvents; // 事件名稱
    once?: boolean;                // 是否執行 一次 默認 false
    execute: (...args: any[]) => void | Promise<void>; // 事件處理
}