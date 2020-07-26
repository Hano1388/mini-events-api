import * as Knex from 'knex';
import faker, { random } from 'faker';
import Auth from '../../utils/auth';
import { geocoder } from '../../utils/geocoder';

const randomAddresses = ['122 Walter Hardwick Ave 305 Vancouver BC V5Y 0C9', '3308 Ash St Vancouver BC V5Z 3E3', '2485 Broadway W 414 Vancouver BC V6K 2E8', '275 28th Ave E Vancouver BC V5V 2M5', '106 588 45th Ave W Vancouver BC V5Z 4S3', '563 Union St Vancouver BC V6A 2B7', '3007 8th Ave W Vancouver BC V6K 2C2', '110 2255 W 8th Vancouver BC V6K 2A6', '408 2260 W 10th Vancouver BC V6K 2H8', '201 151 14th Ave W Vancouver BC V5Y 1W8']

export async function seed(knex: Knex): Promise<void> {
    const password: string = 'supersecret';
    const hashedpassword = await Auth.hashPassword(password);
    // Deletes ALL existing entries
    await knex('users').del();

    const superUserAddress = await geocoder.geocode('333 Seymour St, Vancouver, BC V6B 5A6');
    const { formattedAddress: address, latitude, longitude } = superUserAddress[0];

    const superUser = {
        first_name: '_admin',
        last_name: '_widerfunnel',
        email: 'admin@widerfunnel.ca',
        address,
        latitude,
        longitude,
        is_admin: true,
        password: hashedpassword,
        avatar: faker.internet.avatar(),
        created_at: faker.date.past()
    }

    const usersList = await Promise.all(randomAddresses.map(async (addressSample) => {
        const addressFields = await geocoder.geocode(addressSample);
        const { formattedAddress: address, latitude, longitude } = addressFields[0];
        return {
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            address,
            latitude,
            longitude,
            password: hashedpassword,
            avatar: faker.internet.avatar(),
            created_at: faker.date.past(),
        }
    }))

    usersList.push(superUser);
    return await knex('users').insert(usersList);
}

