import { Main } from "@/Main/Main";
import { TasksList } from "@/TasksList/TasksList";
import { CustomButton } from "@/common/CustomButton/CustomButton";

const App: React.FC = (): JSX.Element => {
  return (
    <Main>
      <CustomButton text="Add task" />
      <TasksList />
    </Main>
  );
};

export default App;
