import mongodb from 'mongodb';

function getClient() {
    const URI = `mongodb+srv://root:mongodb123Ç@cluster0.uxbjjey.mongodb.net/?retryWrites=true&w=majority`;
    return new mongodb.MongoClient(URI);
}

export {
    getClient
}