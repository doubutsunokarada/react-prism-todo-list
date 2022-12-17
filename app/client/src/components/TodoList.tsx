import { List } from "@chakra-ui/react";
import React from "react";
import { Todo } from "../@types";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todoList: Todo[];
  toggleTodoListItemStatus: (args: { id: string; done: boolean }) => void;
  deleteTodoListItem: (id: string) => void;
};

const TodoList: React.FC<TodoListProps> = (props: TodoListProps) => {
  const { todoList, toggleTodoListItemStatus, deleteTodoListItem } = props;
  return (
    <List w={"full"}>
      {todoList.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodoListItemStatus={toggleTodoListItemStatus}
            deleteTodoListItem={deleteTodoListItem}
          />
        );
      })}
    </List>
  );
};

export default TodoList;
