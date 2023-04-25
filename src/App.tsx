import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const onDragEnd = () => {};
  return <DragDropContext onDragEnd={onDragEnd}>
    <span>하하</span>
  </DragDropContext>;
}

export default App;
