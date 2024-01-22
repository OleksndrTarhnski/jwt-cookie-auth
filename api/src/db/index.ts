import mongoose, { ConnectOptions } from 'mongoose';

const url = 'mongodb+srv://Oleksandr:Ne7CqANcU9W@cluster0.engpcsf.mongodb.net/';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    throw error;
  }
};

export default connectToDatabase;