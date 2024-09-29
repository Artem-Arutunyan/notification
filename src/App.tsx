import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import { ROUTES } from "@/constants";
import { TaskCompleted, TaskDescription } from "@/pages";
import { Board } from "./Dnd";

function App() {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="*" element={<Board />} />
          <Route path={"/test"} element={<Board />} />
          <Route
            path={ROUTES.task_description.route}
            element={<TaskDescription />}
          />
          <Route
            path={ROUTES.task_completed.route}
            element={<TaskCompleted />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
