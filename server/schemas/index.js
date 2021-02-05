const mongoose = require('mongoose');

const connect = () => {
    if(process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }

    mongoose.connect('mongodb://mongo:mongo@localhost:27017/admin', {
        dbName: 'reactjs',
        useNewUrlParser: true,
        useCreateIndex: true
    }, (err) => {
        if(err){
            console.error('MongoDB Connected: Error', err);
        }else{
            console.log('MongoDB Connected: Success');
        }
    });
};

mongoose.connection.on('error', (err) => {
    console.error('MongoDB Connected: Error', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connected lost. Will be reconnected MongoDB');
    connect();
});

module.exports = connect;