import React from 'react'
import TimeAgo from 'react-timeago'
import { keyframes } from 'emotion'
import styled from 'react-emotion'
import Flex from './Flex'
import { ProfileImage, ProfileLink } from './Profile'
import Comments from './Comments'

// Post
const PostWrapper = styled(Flex)`
  width: 35rem;
  margin: .5rem;
  border: .05rem solid grey;
  border-radius: .15rem;
  flex-direction: column;
  padding: .5rem;
  background-color: #fafafa;
`

const PostHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 1rem;
  margin-left: .5rem;
  padding-bottom: .5rem;
`

const PostContent = styled.div`
  padding: 1rem 0;
`

const Post = ({
  id,
  text,
  time = new Date(),
  user: {
    id: userId,
    name,
    photo = defaultProfileImage
  },
  comments,
  onCreateComment,
}) => 
  <PostWrapper>
    <Flex direction='column' style={{ width: '100%' }}>
      <Flex direction='row' style={{ width: '100%', borderBottom: '1px solid grey' }}>
        <div>
          <ProfileImage src={photo} alt={`Profile picture of ${name}`} />
        </div>
        <PostHeader>
          <ProfileLink id={userId}>{name}</ProfileLink>
          <TimeAgo date={new Date(time)} live={false} />
        </PostHeader>
      </Flex>
      <PostContent>
        {text}
      </PostContent>
    </Flex>
    <Comments postId={id} comments={comments} onCreateComment={onCreateComment} />
  </PostWrapper>

export default Post

const placeholder = keyframes`
  0% {
    background-position: -400px 0
  }
  100% {
    background-position: 400px 0
  }
`

const StubWrapper = styled(PostWrapper)`
  height: 15rem;
  background: #ebebec;
  background-image: linear-gradient(to right,#ebebec 0%,#e3e3e3 33%,#ebebec 66%,#ebebec 100%);
  animation: ${placeholder} .5s infinite linear forwards;
  background-repeat: no-repeat;
`
export const Stub = () => <StubWrapper />
