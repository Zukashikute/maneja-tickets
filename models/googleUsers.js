module.exports = (mongoose) => {
    const { ObjectId } = mongoose.Schema.Types;
    const GoogleUser = mongoose.model(
        'google_users',
        mongoose.Schema({
            _id: {type: ObjectId, auto: true},
            username: {
                type: String
            },
            googleId: {
            type: String    
            },
        })
    );
return GoogleUser;
}