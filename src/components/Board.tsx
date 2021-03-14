import { useContext } from 'react';
import { BoardContext, BoardContextParams } from '../context/BoardContext';
import { Container } from '../styles/components/Board.styles';

import List from './List';

export default function Board() {
  const { lists }: BoardContextParams = useContext(BoardContext);
  
  return (
      <Container>
        {lists.map((list, index) => (
          <List key={list.title} index={index} data={list} />
          ))}
      </Container>
  )  
}