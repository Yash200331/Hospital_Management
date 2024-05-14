const mongoose=require('mongoose')

const DoctorSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  hospital: { type: String },
  ticketPrice: { type: Number },
  role: {
    type: String,
  },

  // Fields for doctors only
  specialization: { type: String },
  qualifications: {
    type: String,
  },

  experiences: {
    type: String,
  },

  bio: { type: String, maxLength: 50 },
  about: { type: String },
  timeSlots: { type: String },
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
});

module.exports= mongoose.model("Doctor", DoctorSchema);
