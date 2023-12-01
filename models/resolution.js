module.exports = (mongoose) => {
    const { ObjectId } = mongoose.Schema.Types;
    const Resolution = mongoose.model(
        'resolutions',
        mongoose.Schema({
            _id: { type: ObjectId, auto: true },
            ticketId: {
                type: ObjectId,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            dateCreated: {
                type: Date,
                default: Date.now,
                required: true,
            },
            resolvedByEmployee: {
                type: ObjectId,
                required: true,
            },
        })
    );
    return Resolution;
};
