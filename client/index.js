import React, { Fragment } from 'react'
import { render } from 'react-dom'
import styled, { injectGlobal } from 'react-emotion'
import io from 'socket.io-client'

import { defaultProfileImage } from './constants'
import CreatePost from './components/CreatePost'
import Post, { Stub } from './components/Post'

// Socket 
const socket = io()

injectGlobal`
html {
  font-size: 15px;
}
body {
  margin: 0;
  padding: 0;
  font-family: Arial,sans-serif;
  background-color: #e2e6f0;
}
`

const onCreateComment = ({ name, photo = defaultProfileImage, text, postId, commentId, }) => {
  const id = localStorage.getItem('name') === name && localStorage.getItem('photo') === photo
    ? localStorage.getItem('id')
    : Date.now()
  const user = { name, photo, id }

  localStorage.setItem('id', id)

  return fetch('api/comments', {
    method: 'post',
    body: JSON.stringify({ text, user, postId, commentId, }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(r => r.json())
    .then(console.log)
}

const onCreatePost = ({ name, photo = defaultProfileImage, text }) => {
  const id = localStorage.getItem('name') === name && localStorage.getItem('photo') === photo
    ? localStorage.getItem('id')
    : Date.now()
  const user = { name, photo, id }

  localStorage.setItem('id', id)
  localStorage.setItem('name', name)
  localStorage.setItem('photo', photo)

  return fetch('api/posts', {
    method: 'post',
    body: JSON.stringify({ text, user }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(r => r.json())
    .then(console.log)
}

const Wrapper = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

const populateComments = (postId, users, comments) => comments
  .filter(c => c.postId === postId && c.commentId === undefined)
  .map(({ userId, ...c }) => ({ ...c, user: users.find(u => u.id === userId) }))
  .map(c => ({
    ...c,
    comments: comments
      .filter(c => c.commentId === c.id)
      .map(({ userId, ...c }) => ({ ...c, user: users.find(u => u.id === userId) }))
  }))

class App extends React.PureComponent {
  state = {
    posts: [],
    comments: [],
    users: [],
    loading: true
  }

  componentDidMount() {
    this.getNewData()

    // TODO: Optimize this by updating state with only new stuff
    socket.on('new post', this.getNewData)
    socket.on('new comment', this.getNewData)
  }

  getNewData = () => {
    this.setState({ loading: true })
    return Promise.all([
      fetch('/api/posts/').then(r => r.json()),
      fetch('/api/comments/').then(r => r.json()),
      fetch('/api/users/').then(r => r.json()),
    ])
      .then(([posts, comments, users]) => this.setState({ posts, comments, users, loading: false }))
  }

  render () {
    const { posts, comments, users, loading } = this.state

    return (
      <Wrapper>
        <h2>Fakebook</h2>
        <CreatePost onSubmit={e => onCreatePost(e).then(this.getNewData)} />
        {
          loading
            ? <Stub />
            : posts.map(({ userId, ...post }) =>
              <Post
                key={post.id}
                comments={populateComments(post.id, users, comments)}
                user={users.find(u => u.id === userId)}
                {...post}
                onCreateComment={e => onCreateComment(e).then(this.getNewData)}
              />
            )
        }
      </Wrapper>
    )
  }
}

render(<App />, document.getElementById('root'))