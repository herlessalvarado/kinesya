const mongoose = require('mongoose');

const URI = "mongodb+srv://pkapp:1234qwer5t@cluster0-mprw5.mongodb.net/test?retryWrites=true&w=majority";

const connectDB = async() => {
    await mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log('DB Connected!');
}

module.exports = connectDB;