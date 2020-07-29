// import execSync from child_process to execute shell commands
const { execSync } = require('child_process');
const { log } = console;

const environment: string = process.env.NODE_ENV || 'development';
// Load knex config for environment
const knexConfig = require('../../knexfile')[environment]

const isPgInstalled = (): boolean => /PostgreSQL/.test(execSync('psql --version').toString());

if (isPgInstalled()) {
    try {
        process.env.npm_lifecycle_event === 'db:create' ?
            log(execSync(`createdb --echo ${knexConfig.connection.database}`).toString()) :
            log(execSync(`dropdb --echo --if-exists ${knexConfig.connection.database}`).toString());
    } catch (error) {
        // create or drop db error message is sufficient
    }
} else {
    log('Please install PostgreSQL')
}