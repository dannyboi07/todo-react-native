import React from "react";
import BaseTodo from "./BaseTodo";
import BaseTextInput, { BaseTextInputProps } from "../Input/BaseInput";
import { TodoProps } from "./Todo";

interface CreateTodoProps extends TodoProps {
    text: string;
    onChangeText: BaseTextInputProps["onChangeText"];
    onSubmit: BaseTextInputProps["onSubmitEditing"];
}

function CreateTodo({
    done,
    text,
    onChangeText,
    onSubmit,
    ...props
}: CreateTodoProps) {
    return (
        <BaseTodo done={done} {...props}>
            <BaseTextInput
                value={text}
                onChangeText={onChangeText}
                placeholder="Create a new todo.."
                autoCapitalize="sentences"
                onSubmitEditing={onSubmit}
            />
        </BaseTodo>
    );
}

export default CreateTodo;
