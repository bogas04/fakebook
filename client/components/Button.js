import styled from 'react-emotion'

export default styled.button`
	box-shadow: inset 0px 1px 0px 0px #54a3f7;
	background: linear-gradient(to bottom, #007dc1 5%, #0061a7 100%);
	background-color: #007dc1;
	border-radius: 3px;
	border: 1px solid #124d77;
	display: inline-block;
	cursor: pointer;
	color: #ffffff;
	font-size: .8rem;
	padding: .4rem 1rem;
	text-decoration: none;
  text-shadow: 0 1px 0 #154682;
  &:hover {
    background: linear-gradient(to bottom, #0061a7 5%, #007dc1 100%);
    background-color: #0061a7;
  }
  &:active {
    position: relative;
    top: 1px;
  }
`