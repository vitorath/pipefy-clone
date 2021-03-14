import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
 
import Board from './components/Board';
import Header from './components/Header';

import { BoardContextProvider } from './context/BoardContext';

import GlobalStyle from './styles/global';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <GlobalStyle />
      <Header />
      <BoardContextProvider>
        <Board />
      </BoardContextProvider>
    </DndProvider>
  );
}

export default App;
