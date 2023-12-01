module.exports = (mongoose) => {
    const { ObjectId } = mongoose.Schema.Types;
    const Tickets = mongoose.model(
        'tickets',
        mongoose.Schema({
            _id: { type: ObjectId, auto: true },
            userId: {
                type: ObjectId,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            priorityLevel: {
                type: String,
                enum: ['Low', 'Medium', 'High'],
                default: 'Low',
                required: true,
            },
            status: {
                type: String,
                enum: ['New', 'In Progress', 'Pending', 'Resolved', 'Closed'],
                default: 'New',
                required: true,
            },
            assignedEmployee: {
                type: ObjectId,
                required: true,
            },
            dateCreated: {
                type: Date,
                default: Date.now,
                required: true,
            },
        })
    );
    return Tickets;
};
