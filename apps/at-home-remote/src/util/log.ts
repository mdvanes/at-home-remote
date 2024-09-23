import { appendFileSync } from 'node:fs';

export type ILog = (...msg: string[]) => void;

export const createLog =
  (context: string): ILog =>
  (...msg) => {
    try {
      const timestamp = new Date().toISOString();
      const newMsg = [`\n[${timestamp} ${context}]`, ...msg];
      console.log(...newMsg);
      appendFileSync('data/log.txt', newMsg.join('\t'));
    } catch (err) {
      console.log(err);
    }
  };
