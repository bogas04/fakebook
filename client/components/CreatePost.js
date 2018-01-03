import React from 'react'
import styled from 'react-emotion'
import TextArea from './TextArea'
import Button from './Button'
import Input from './Input'

// Create Post
const CreatePost = ({ onSubmit, ...props }) =>
  <form
    style={{ width: '35rem', margin: '.5rem', padding: '.5rem' }}
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

      onSubmit({ text, name, photo })

      e.target.reset()
    }}
    {...props}>
      <TextArea rows='3' name='text' placeholder='How are you feeling?' />
      <Input type='text' name='name' placeholder='Name' />
      <Input type='text' name='photo' placeholder='Image url' />
      <Button>Post</Button>
    </form>

export default CreatePost