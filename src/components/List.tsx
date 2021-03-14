import { MdAdd } from 'react-icons/md'; 
import { ListResult } from '../services/api';

import { Container } from '../styles/components/List.styles';
import Card from './Card';

type ListParams = {
  data: ListResult
  index: number
}

export default function List({ data, index: listIndex }: ListParams) {
  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type="button">
            <MdAdd size={24} color="#FFF"/>
          </button>
        )}
      </header>

      <ul>
        {data.cards.map((card, index) => (
          <Card 
            key={card.id} 
            listIndex={listIndex}
            index={index} 
            data={card}/>
        ))}
      </ul>
    </Container>
  )
}