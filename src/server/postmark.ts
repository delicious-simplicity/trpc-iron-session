import { ServerClient } from 'postmark';
import { env } from '~/env.mjs';

export const client = new ServerClient(env.POSTMARK_SERVER_TOKEN);
