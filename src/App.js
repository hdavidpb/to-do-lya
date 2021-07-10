import Header from "./components/header/Header";
import TaskList from "./components/taskList/TaskList";
import ModeProvider from "./context/ModeProvider";

import TaskProvider from "./context/TaskProvider";

function App() {
  return (
    <ModeProvider>
      <TaskProvider>
        <div className="container-todo">
          <Header />
          <TaskList />
        </div>
      </TaskProvider>
    </ModeProvider>
  );
}

export default App;
