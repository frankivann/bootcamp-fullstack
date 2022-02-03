const { connection } = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index')
const Note = require('../src/models/Note')

const api = supertest(app)

const initialNotes = [
  {
    content: 'Learning FullStack w/ midudev',
    important: true,
    date: new Date()
  },
  {
    content: 'My english is so basic',
    important: true,
    date: new Date()
  }
]

beforeEach(async () => {
  await Note.deleteMany({})

  const note1 = new Note(initialNotes[0])
  await note1.save()

  const note2 = new Note(initialNotes[1])
  await note2.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-type', /application\/json/)
})

test('there are 2 notes', async () => {
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(initialNotes.length)
})

test('the first note is about midudev', async () => {
  const response = await api.get('/api/notes')
  expect(response.body[0].content).toBe('Learning FullStack w/ midudev')
})

afterAll(() => {
  connection.close()
  server.close()
})
