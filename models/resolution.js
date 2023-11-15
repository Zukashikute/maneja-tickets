module.exports = (mongoose) => {
const { ObjectId } = mongoose.Schema.Types;
const Resolution = mongoose.model(
'resolution',
mongoose.Schema({
   _id: {type: ObjectId, auto: true},
   ticketStatus: {
    type: String
   },
   resolution: {
    type: String
   },
   employeeAssigned: {
    type: String
   }, 
})    
);
return Resolution    
}