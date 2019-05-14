const mongoose = require('mongoose')

const uri = "mongodb+srv://gsoykan:twxq431paq@gurkansbucket-2mkvc.mongodb.net/TaskManagerDB?retryWrites=true";

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }, (error) => {
    if (error) {
        console.log(error)
    }
})
