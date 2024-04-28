import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.jsx'


const sql = neon('postgresql://moolahmate_owner:wNOpWQYI48SC@ep-summer-tooth-a2kfthbm.eu-central-1.aws.neon.tech/moolahmate?sslmode=require');
export const db = drizzle(sql, { schema }); 