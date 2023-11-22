module.exports = (mongoose) => {
const { ObjectId } = mongoose.Schema.Types;
const Resolution = mongoose.model(
'resolutions',
mongoose.Schema({
   _id: {type: ObjectId, auto: true},
   ticketStatus: {
    type: String,
    required: true
   },
   resolution: {
    type: String,
    required: true
   },
   employeeAssigned: {
    type: String,
    required: true
   }, 
})    
);
return Resolution    
}