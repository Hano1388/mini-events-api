// Update with your config settings.
const sharedConfig = {
    client: 'pg',
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: 'src/db/migrations'
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
        database: 'mini_events_prod'
    }
};