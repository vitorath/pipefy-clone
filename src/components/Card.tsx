
import { useContext, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { BoardContext, BoardContextParams } from '../context/BoardContext';

import { CardsResult } from "../services/api";
import { Container, Label } from "../styles/components/Card.styles";

type CardParam = {
  data: CardsResult
  index: number
  listIndex: number
}

type DragParam = {
  isDragging: boolean
}

type DraggeableItem = {
  index: number
  listIndex: number
}

export default function Card({ data, index, listIndex }: CardParam) {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;

  const { move }: BoardContextParams = useContext(BoardContext);

  const [{ isDragging }, dragRef]:[DragParam, any, ...any] = useDrag(() => ({
    type: 'CARD',
    item: { index, listIndex } as DraggeableItem,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }));

  const [, dropRef] = useDrop(() => ({
    accept: 'CARD',
    hover: (item: DraggeableItem, monitor) => {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if ((draggedIndex === targetIndex) && (draggedListIndex === targetListIndex)) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      
      const targetCenter = (targetSize.bottom - targetSize.top) / 2
      
      const draggedOffset = monitor.getClientOffset();
      if (!draggedOffset) {
        return;
      }

      const draggedTop = draggedOffset.y - targetSize.top;

      if ((draggedIndex < targetIndex) && (draggedTop < targetCenter)) {
        return;
      }

      if ((draggedIndex > targetIndex) && (draggedTop > targetCenter)) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;

    }
  }))

  dragRef(dropRef(ref))

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map(label => 
          <Label key={label} color={label}/>
          )}
      </header>
      <p>{data.content}</p>
      {data.user && <img src={data.user} alt=""/>}
    </Container>
  );
}