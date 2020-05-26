const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const participant = require('./models/participantmodel');
const question = require('./models/questionmodel')

mongoose.connect(
  "mongodb+srv://aravind:9994320498@cluster0-3msaz.azure.mongodb.net/quiz?retryWrites=true&w=majority", {
    useNewUrlParser: true
  }
);

const app = express();

app.use(express.static(path.join(__dirname, "../dist/")));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(cors());


app.post('/api/register', (req, res) => {
  const insertParticipant = new participant({
    name: req.body.name,
    email: req.body.email,
  })
  insertParticipant.save((err, data) => {
    if (err) {
      return null
    }
    //console.log(data);
    res.json({
      data
    })
  });
});

app.post('/api/questions', (req, res) => {
  const insertQuestion = new question({
    questions: req.body
  })
  insertQuestion.save((err, question) => {
    if (err) throw err;
    // console.log(data);
    res.json({
      question
    })
  });
});

app.get('/api/updatescore/:id', (req, res) => {
  participant.findByIdAndUpdate({
    _id: req.params.id
  }, {
    $inc: {
      score: 1
    }
  }, (err, updatedData) => {
    if (err) {
      return null
    }
    res.json(updatedData)

  })
})

app.get('/api/getscore/:id', (req, res) => {
  participant.find({
    _id: req.params.id
  }, (err, user) => {
    if (err) {
      return null;
    } else {
      res.json(user)
    }
  })
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/", "index.html"));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("node server is running")
});
