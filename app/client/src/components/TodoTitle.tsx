import { As, Heading, SpaceProps, TypographyProps } from "@chakra-ui/react";
import React, { memo } from "react";

type TodoTitleProps = {
  title: string;
  as: As<any>;
} & SpaceProps &
  TypographyProps;

const TodoTitle: React.FC<TodoTitleProps> = memo(
  (
    { title, as, mt, fontSize }: TodoTitleProps
  ) => {
    return (
      <Heading mt={mt} as={as} fontSize={fontSize} w="full">
        {title}
      </Heading>
    );
  }
);

export default TodoTitle;
