module.exports = (mongoose) => {
    const { ObjectId } = mongoose.Schema.Types;
    const GoogleUser = mongoose.model(
        'google_users',
        mongoose.Schema({
            _id: {type: ObjectId, auto: true},
            username: {
                type: String,
                required: true
            },
            googleId: {
            type: String,
            required: true    
            },
        })
    );
return GoogleUser;
}