import manifest from '../_data/manifest.json';
import { createUnlockHandler } from '../../lib/protected-unlock.mjs';

interface Env {
  PROTECTED_POST_PASSWORD: string;
  PROTECTED_COOKIE_SECRET?: string;
}

const handleUnlock = createUnlockHandler(manifest);

export const onRequestGet: PagesFunction<Env> = async (context) =>
  handleUnlock(context.request, context.env);

export const onRequestPost: PagesFunction<Env> = async (context) =>
  handleUnlock(context.request, context.env);
