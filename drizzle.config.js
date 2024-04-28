/** @type { import("drizzle-kit").Config } */


export default {
    schema: "./utils/schema.jsx",
    driver: 'pg',
    dbCredentials: {
        connectionString: 'postgresql://moolahmate_owner:wNOpWQYI48SC@ep-summer-tooth-a2kfthbm.eu-central-1.aws.neon.tech/moolahmate?sslmode=require',
    }
};