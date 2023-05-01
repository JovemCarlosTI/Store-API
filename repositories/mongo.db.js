import mongoose from 'mongoose';

async function connect() {
    const URI = `mongodb+srv://root:mongodb123Ç@cluster0.uxbjjey.mongodb.net/?retryWrites=true&w=majority`;
    return await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
}

export {
    connect
}