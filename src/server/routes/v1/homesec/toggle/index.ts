import { defineEventHandler } from 'h3';

// http://localhost:5173/api/v1/homesec/toggle
export default defineEventHandler(() => ({ message: 'Toggle!' }));
