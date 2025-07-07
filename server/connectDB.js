const mongoose = require('mongoose');

try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected succesfully!");
} catch (error) {
    console.log("Error connecting to Database!", error.message);
}


module.exports = connectDB;