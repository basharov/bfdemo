import styled from 'styled-components'

export const StatusPanelContainer = styled.div`
  background-color: gray;
  display: flex;
  flex-direction: row;
  color: #fff;
  padding: 10px;
  align-items: center;

  > * {
    margin: 10px;
  }
`

const Circle = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 7px;
`

export const DisconnectedCircle = styled(Circle)`
  background-color: red;
`
export const ConnectedCircle = styled(Circle)`
  background-color: green;
`

export const RedButton = styled.button`
  background-color: red;
  border: 0;
  color: #fff;

  &:disabled {
    opacity: 0.2;
  }
`
