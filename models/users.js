module.exports = (mongoose) => {
    const { ObjectId } = mongoose.Schema.Types;
    const Users = mongoose.model(
    'users',
    mongoose.Schema({
        _id: {type: ObjectId, auto: true},
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        jobPosition: {
            type: String,
            required: true
        }, 
    })
    );
return Users
}