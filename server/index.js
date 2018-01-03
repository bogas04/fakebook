const express = require('express')
const bodyParser = require('body-parser')
const { addComment, getComments, addPost, getPosts, getUsers } = require('./db')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app
  /* Middlewares */
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })
  .use(bodyParser.json())

  /* Static */
  .use(express.static('public'))

  /* API - Get Requests */
  // Get all users
  .get('/api/users', (req, res) =>
    getUsers()
      .then(users => res.status(200).json(users))
  )

  // Get all posts
  .get('/api/posts', (req, res) =>
    getPosts()
      .then(posts => res.status(200).json(posts))
  )

  // Get all comments (all of them)
  .get('/api/comments', (req, res) =>
    getComments()
      .then(comments => res.status(200).json(comments))
  )

  /* API - Post Requests */
  // Create new post
  .post('/api/posts', async (req, res) => {
    const { text, user } = req.body
    try {
      await addPost({ text, user })
      res.status(200).json({ error: false })
      io.emit('new post', { text, user })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error })
    }
  })

  // Create new comment
  .post('/api/comments', async (req, res) => {
    const { text, postId, commentId, user } = req.body
    try {
      await addComment({ text, user, postId, commentId })
      res.status(200).json({ error: false })
      io.emit('new comment', { text, user, postId, commentId })
    } catch (error) {
      res.status(500).json({ error })
    }
  })

io.on('connection', socket => {
  console.log('[socket] A user connected', socket.id)
  socket.on('disconnect', () => console.log('[socket] A user disconnected', socket.id))
})

// Start the server
http.listen(1337, () => console.log('server is listening on port 1337'))

