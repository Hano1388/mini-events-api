import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable('users', (t: Knex.TableBuilder): void => {
        t.increments('id').primary();
        t.string('first_name');
        t.string('last_name');
        t.string('email').unique().notNullable();
        t.string('password').notNullable();
        t.string('address');
        t.float('latitude');
        t.float('longitude');
        t.boolean('is_admin').defaultTo(false);
        t.timestamp('created_at').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('users');
}