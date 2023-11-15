module.exports = (mongoose) => {
    const { ObjectId } = mongoose.Schema.Types;
    const Users = mongoose.model(
    'users',
    mongoose.Schema({
        _id: {type: ObjectId, auto: true},
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        username: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        jobPosition: {
            type: String
        }, 
    })
    );
return Users
}