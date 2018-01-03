import styled from 'react-emotion'

const Flex = styled.div`
  display: flex;
  justify-content: ${({ justifyContent = 'flex-start' }) => justifyContent};
  align-items: ${({ alignItems = 'flex-start' }) => alignItems};
  flex-direction: ${({ direction = 'row' }) => direction};
`

export default Flex 