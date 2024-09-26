const auth = require('./auth-model.js');
const db = require('../database/dbConfig.js');

describe('auth-model.js tests', () => {

    // wait for the database to be reset 
    beforeEach(async () => {
        await db('users').truncate();
    });

    describe('add()', () => {
        it('should add the new users to the db', async () => {
            
            // adding 2 users to the database 
            await auth.add({ username: 'Yakuana', password: 'davis'});
            await auth.add({ username: 'Jay', password: 'davis' });

            // get users array from db 
            let users = await db('users');

            // added kuana and jay (2 users) to empty table 
            expect(users).toHaveLength(2);
        });

        it('should find user in database by the username', async () => {
            // added a new user 
            await auth.add({ username: 'John', password: 'smith'});

            // look for the added user 
            let user = await db('users')
                .where({ username: 'John' })
                .first();

            // check if the username is in the db 
            expect(user.username).toBe('John');
        });
    });
});