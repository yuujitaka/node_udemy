const mockData = require('./mockdata.json');
const Job = require('./model/Job');
const connectDB = require('./config/db');

const start = async () => {
  try {
    await connectDB();
    await Job.create(mockData);
    console.log('Successfully populated!!!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
