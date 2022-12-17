import TodoTitle from "./components/TodoTitle";
import TodoList from "./components/TodoList";
import { useTodo } from "./hooks/useTodo";
import { Todo } from "./@types";
import { useRef } from "react";
import TodoAdd from "./components/TodoAdd";
import { Container } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const App: React.FC = () => {
  const {
    todoList,
    addTodoListItem,
    toggleTodoListItemStatus,
    deleteTodoListItem,
  } = useTodo();
  const inputEl = useRef<HTMLTextAreaElement>(null);
  const handleAddTodoListItem = () => {
    if (!inputEl.current || inputEl.current.value === "") {
      return;
    } else {
      addTodoListItem(inputEl.current.value);
      inputEl.current.value = "";
    }
  };

  const inCompletedList = todoList.filter((todo: Todo) => {
    return !todo.done;
  });

  const completedList = todoList.filter((todo: Todo) => {
    return todo.done;
  });

  return (
    <Container centerContent p={{ base: 4, md: 6 }} maxWidth="3xl">
      <TodoTitle
        title={"TODO list App"}
        as={"h1"}
        fontSize={{ base: "2xl", md: "3xl" }}
      />
      <TodoAdd
        inputEl={inputEl}
        handleAddTodoListItem={handleAddTodoListItem}
        placeholder={"Task content."}
        leftIcon={<AddIcon />}
      />
      <TodoTitle
        title={"Incomplete task list"}
        as={"h2"}
        mt={8}
        fontSize={{ base: "xl", md: "2xl" }}
      />
      <TodoList
        todoList={inCompletedList}
        toggleTodoListItemStatus={toggleTodoListItemStatus}
        deleteTodoListItem={deleteTodoListItem}
      />
      <TodoTitle
        title={"Complete task list"}
        as={"h2"}
        mt={8}
        fontSize={{ base: "xl", md: "2xl" }}
      />
      <TodoList
        todoList={completedList}
        toggleTodoListItemStatus={toggleTodoListItemStatus}
        deleteTodoListItem={deleteTodoListItem}
      />
    </Container>
  );
};

export default App;
