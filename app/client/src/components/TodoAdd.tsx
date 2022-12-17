import { Button, ButtonOptions, Textarea } from "@chakra-ui/react";
import React from "react";

type TodoAddProps = {
  inputEl: React.RefObject<HTMLTextAreaElement>;
  handleAddTodoListItem: () => void;
  placeholder: string;
} & ButtonOptions;

const TodoAdd: React.FC<TodoAddProps> = ({
  inputEl,
  handleAddTodoListItem,
  placeholder,
  leftIcon,
}: TodoAddProps) => {
  return (
    <>
      <Textarea
        placeholder={placeholder}
        ref={inputEl}
        bgColor="white"
        mt={8}
        borderColor="gray.400"
      />
      <Button
        onClick={handleAddTodoListItem}
        colorScheme="blue"
        leftIcon={leftIcon}
        mt={8}
      >
        Add Task.
      </Button>
    </>
  );
};

export default TodoAdd;
