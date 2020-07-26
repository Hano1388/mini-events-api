import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable('events', (t: Knex.TableBuilder): void => {
        t.increments('id').primary();
        t.string('title');
        t.text('description');
        t.dateTime('date');
        t.bigInteger('user_id').references('users.id');
        t.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('events');
}

