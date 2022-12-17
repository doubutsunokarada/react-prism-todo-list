import { useState, useEffect } from "react";
import { ulid } from "ulid";
import { Todo } from "../@types";
import * as todoData from "../api/todos";

type ToggleTodoProps = {
  id: string;
  done: boolean;
};

export const useTodo = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  useEffect(() => {
    todoData.getAllTodosData().then((todo) => {
      setTodoList([...todo].reverse());
    });
  }, []);

  const toggleTodoListItemStatus = ({ id, done }: ToggleTodoProps) => {
    const todoItem: Todo | undefined = todoList.find((todo) => todo.id === id);
    if (todoItem !== undefined) {
      const newTodoItem: Todo = { ...todoItem, done: !done };
      todoData.updateTodoData(id, newTodoItem).then((updatedTodo: Todo) => {
        const newTodoList = todoList.map((todo) => {
          if (todo.id !== updatedTodo.id) {
            return todo;
          } else {
            return updatedTodo;
          }
        });
        setTodoList(newTodoList);
      });
    }
  };

  const addTodoListItem = async (todoContent: string) => {
    const newTodoItem: Todo = {
      id: ulid(),
      content: todoContent,
      done: false,
    };

    return todoData
      .addTodoData(newTodoItem)
      .then((addTodo) => {
        setTodoList([addTodo, ...todoList]);
      })
      .catch((e) => {
        throw e;
      });
  };

  const deleteTodoListItem = (id: string) => {
    todoData.deleteTodoData(id).then((deleteListItemId) => {
      const newTodoList = todoList.filter(
        (todo) => todo.id !== deleteListItemId
      );
      setTodoList(newTodoList);
    });
  };

  return {
    todoList,
    toggleTodoListItemStatus,
    addTodoListItem,
    deleteTodoListItem,
  };
};
