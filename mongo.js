const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = encodeURIComponent(process.argv[2])

const url = `mongodb://fullstack:${password}@ac-umezng9-shard-00-00.ms8yls1.mongodb.net:27017,ac-umezng9-shard-00-01.ms8yls1.mongodb.net:27017,ac-umezng9-shard-00-02.ms8yls1.mongodb.net:27017/noteApp?tls=true&replicaSet=atlas-9fcvkn-shard-0&authSource=admin&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

// Generate new note
// const note = new Note({
//   content: 'abc',
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

// Fetching objects from the database
Note.find({ important: false }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})