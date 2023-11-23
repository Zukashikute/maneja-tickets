module.exports = (mongoose) => {
const { ObjectId } = mongoose.Schema.Types;
const Resolution = mongoose.model(
'resolutions',
mongoose.Schema({
   _id: {type: ObjectId, auto: true},
   ticketStatus: {
    type: String,
    default: 'Open',
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
   ticketID: {
      type: Number,
      default: function() {
         return Math.floor(Math.random() * 1001); // Generates a random number between 0 and 1000
      }
   }
})    
);
return Resolution    
}