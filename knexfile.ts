// Update with your config settings.
const sharedConfig = {
    client: 'pg',
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        directory: '/src/db/migrations'
    },
    seeds: {
        directory: '/src/db/seeds'
    }
};

export = {
    development: {
        ...sharedConfig,
        connection: {
            database: 'mini_events_dev'
        }
    },
    staging: {
        ...sharedConfig,
        connection: {
            database: 'mini_events_staging'
        }
    },
    production: {
        connection: process.env.DATABASE_URL
    }
};