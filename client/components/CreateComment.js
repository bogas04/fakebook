import React from 'react'
import styled from 'react-emotion'
import TextArea from './TextArea'
import Button from './Button'
import Input from './Input'

// Create Comment 
const CreateComment = ({ postId, commentId, onSubmit, ...props }) => 
  <form
    onSubmit={e => {
      e.preventDefault()
      e.stopPropagation()
      let {
        text: { value: text },
        name: { value: name },
        photo: { value: photo },
      } = e.target

      name = name === '' ? 'Anon' : name
      photo = photo === '' ? undefined : photo

      onSubmit({ text, name, photo, postId, commentId })

      e.target.reset()
    }} {...props}>
    <TextArea rows='2' name='text' placeholder='Write a comment' />
    <Input type='text' name='name' placeholder='Name' />
    <Input type='text' name='photo' placeholder='Image url' />
    <Button>Comment</Button>
  </form>

export default CreateComment