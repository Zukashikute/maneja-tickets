module.exports = (mongoose) => {
const { ObjectId } = mongoose.Schema.Types;
const Tickets = mongoose.model(
'tickets',
mongoose.Schema({
    _id: {type: ObjectId, auto: true},
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    jobPosition: {
       type: String,
       required: true  
    },
    ticketTitle: {
        type: String,
        required: true
    },
    ticketDescription: {
        type: String,
        required: true
    },
    // ticketId: {
    //     type: Number
    // },
    dateCreated: {
        type: Date,
        default: Date.now,
        required: true
    },
    priorityLevel: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low',
        required: true
    },
})    
);
return Tickets
}