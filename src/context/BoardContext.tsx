import { createContext, useState } from 'react';
import produce from 'immer'; 


import { ListResult, loadLists } from '../services/api';

export type BoardContextParams = {
  lists: Array<ListResult>,
  move: (fromList: number, toList: number, from: number, to: number) => void;

}

export const BoardContext = createContext({} as BoardContextParams);

export const BoardContextProvider: React.FC = ({ children }) => {
  const [lists, setLists] = useState(loadLists());

  function move(fromList: number, toList: number, from: number, to: number) {
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from];
      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.splice(to, 0, dragged);
    }));
  }

  return (
    <BoardContext.Provider value={{ lists, move}}>
      {children}
    </BoardContext.Provider>
  )
}