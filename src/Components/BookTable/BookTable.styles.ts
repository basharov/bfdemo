import styled from 'styled-components'

export const BookContainer = styled.div`
  background: lightgrey;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
`

export const MainContainer = styled.div`
  background: whitesmoke;
  display: flex;
  flex-direction: column;
  border: 1px solid #888;
  margin: 10px;
  padding: 10px;
  flex-grow: 1;
  flex-basis: 50%;
`

export const BookRow = styled.tr`
  padding: 5px;


  td {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 5px 0;
  }
`

export const TableHeader = styled.h3`
  margin: 0 0 10px;
`
