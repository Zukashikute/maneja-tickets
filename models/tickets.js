module.exports = (mongoose) => {
const { ObjectId } = mongoose.Schema.Types;
const Tickets = mongoose.model(
'tickets',
mongoose.Schema({
    _id: {type: ObjectId, auto: true},
    username: {
        type: String
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    jobPosition: {
       type: String  
    },
    ticketTitle: {
        type: String
    },
    ticketDescription: {
        type: String
    },
    ticketId: {
        type: Number
    },
    dateAndTime: {
        type: Date
    },
    priorityLevel: {
        type: String
    },
})    
);
return Tickets
}