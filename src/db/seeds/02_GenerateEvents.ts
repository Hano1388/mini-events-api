import * as Knex from 'knex';
import faker from 'faker';
const knex = require('../client');

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('events').del();
    const users = await knex('users').select('id');
    const eventList = await users.map((user) => {
        return {
            title: faker.company.catchPhrase(),
            description: faker.lorem.paragraphs(),
            date: faker.date.between('2020-09-01', '2020-09-20'),
            user_id: user.id,
            created_at: faker.date.past(),
        };
    });

    return await knex('events').insert(eventList);
}
