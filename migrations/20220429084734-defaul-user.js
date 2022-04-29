const bcrypt = require('bcrypt');
module.exports = {
    async up(db, client) {

        // password hashing
        const salt = await bcrypt.genSalt(15);

        const hashPassword = await bcrypt.hash('awesome', salt);

        // create a default user
        return db.collection('users').insert({
            name: 'john Smith',
            email: 'hello@awesomecode.geeth',
            password: hashPassword
        })
    },

    async down(db, client) {

        // undo migration
        return db.collection('users').updateMany({}, { $unset: { quantity: null } });

    }
};
