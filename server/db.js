let users = [
  {
    id: 1,
    name: 'Musicademy',
    photo: 'https://www.freeiconspng.com/uploads/profile-icon-9.png',
  },
  {
    id: 2,
    name: 'Dave Dringenburg',
    photo: 'https://www.freeiconspng.com/uploads/profile-icon-9.png',
  },
  {
    id: 3,
    name: 'Miguel Colon',
    photo: 'https://www.freeiconspng.com/uploads/profile-icon-9.png',
  },
  {
    id: 4,
    name: 'John Adam',
    photo: 'https://www.freeiconspng.com/uploads/profile-icon-9.png',
  },
]

let posts = [
  {
    id: 1,
    text: `Do you think that people going through a divorce should be allowed to be on a worship team?`,
    time: Date.now() - 1000 * 60 * 60 * 13,
    userId: 1,
  },
]

let comments = [
  {
    id: 1,
    postId: 1,
    text: `This is the most absurd question I've ever read. This is the most absurd question I've ever read. This is the most absurd question I've ever read. This is the most absurd question I've ever read.`,
    time: Date.now() - 1000*60*60*5,
    userId: 2,
  },
  {
    id: 3,
    postId: 1,
    text: `What are you talking about???`,
    time: Date.now() - 1000*60*60*2,
    userId: 4,
  },
  {
    id: 2,
    postId: 1,
    commentId: 1,
    text: `You're right`,
    time: Date.now() - 1000*60*60*10,
    userId: 3,
  },
]

const getPosts = async () => posts.sort((b, a) => a.time - b.time)

const getComments = async () => comments.sort((a, b) => a.time - b.time)

const getUsers = async () => users 

const addPost = async ({ text, user }) => {
  const poster = users.find(u => u.id === user.id)
  if (poster === undefined) {
    users.push(user)
  }
  posts.push({
    id: Date.now(),
    text,
    userId: user.id,
    time: Date.now(),
  })
}

const addComment = async ({ text, user, postId, commentId }) => {
  const poster = users.find(u => u.id === user.id)
  if (poster === undefined) {
    users.push(user)
  }
  comments.push({
    id: Date.now(),
    text,
    postId,
    commentId,
    userId: user.id,
    time: Date.now(),
  })
}

module.exports = {
  addComment,
  getComments,
  addPost,
  getPosts,
  getUsers,
}