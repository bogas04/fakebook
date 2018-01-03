import React from 'react'
import styled from 'react-emotion'
import TimeAgo from 'react-timeago'

import TextArea from './TextArea'
import CreateComment from './CreateComment'
import Flex from './Flex'
import { ProfileImage, ProfileLink } from './Profile'

const CommentsWrapper = styled.div`
  background-color: #f3f3f3;
  width: 100%;
`

const CommentWrapper = styled.div`
  padding: 0.5rem 0;
`

const Comment = ({ text, time, user: { id, name, photo } }) =>
  <CommentWrapper>
    <Flex direction='column' style={{ width: '100%' }}>
      <Flex direction='row' style={{ width: '100%' }}>
        <div>
          <ProfileImage src={photo} alt={`Profile picture of ${name}`} />
        </div>
        <div>
          <ProfileLink id={id}>{name}</ProfileLink>
          {text}
        </div>
      </Flex>
      <div style={{ margin: '0 .5rem' }}>
        <TimeAgo date={new Date(time)} live={false} />
      </div>
    </Flex>
  </CommentWrapper>

const Comments = ({ postId, comments, onCreateComment }) => 
  <CommentsWrapper>
    {comments.map(c => <Comment key={c.id} {...c} />)}
    <CreateComment postId={postId} onSubmit={onCreateComment} />
  </CommentsWrapper>

export default Comments