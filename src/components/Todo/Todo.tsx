import React from "react";
import BaseTodo, { BaseTodoProps } from "./BaseTodo";
import BaseText from "../Text/BaseText";

export interface CoreTodoProps {
    text: string;
    done: boolean;
}

// export interface Todo extends CoreTodoProps {}

export interface TodoProps
    extends Omit<BaseTodoProps, "children">,
        CoreTodoProps {}

function Todo({ done, text, ...props }: TodoProps) {
    return (
        <BaseTodo done={done} {...props}>
            <BaseText>{text}</BaseText>
        </BaseTodo>
    );
}

export default Todo;
