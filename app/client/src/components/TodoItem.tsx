import { DeleteIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton, ListItem, Text } from "@chakra-ui/react";
import React from "react";
import { Todo } from "../@types";

type TodoItemProps = {
  todo: Todo;
  toggleTodoListItemStatus: (args: { id: string; done: boolean }) => void;
  deleteTodoListItem: (arg: string) => void;
};

const TodoItem: React.FC<TodoItemProps> = (props: TodoItemProps) => {
  const { todo, toggleTodoListItemStatus, deleteTodoListItem } = props;
  const handleToggleTodoListItem = () =>
    toggleTodoListItemStatus({ id: todo.id, done: todo.done });
  const handleDeleteTodoListItem = () => deleteTodoListItem(todo.id);
  const label = todo.done ? "To incomplete list." : "To complete list.";
  const setColorScheme = todo.done ? "pink" : "blue";

  return (
    <ListItem
      borderWidth={"1px"}
      p={4}
      mt="4"
      bg={"white"}
      borderRadius="md"
      borderColor={"gray.300"}
    >
      <Text mb={6}>{todo.content}</Text>
      <Flex align="center" justify={"flex-end"}>
        <Button
          colorScheme={setColorScheme}
          variant="outline"
          onClick={handleToggleTodoListItem}
          size="sm"
        >
          {label}
        </Button>
        <IconButton
          icon={<DeleteIcon />}
          variant="unstyled"
          aria-label="delete"
          onClick={handleDeleteTodoListItem}
        >
          Delete task.
        </IconButton>
      </Flex>
    </ListItem>
  );
};

export default TodoItem;
