import React, { useState, useContext } from "react";
import { Alert } from "react-native";
import BaseLayout from "../layouts/BaseLayout";
import BaseView from "../components/View/BaseView";
import BaseText from "../components/Text/BaseText";
import BaseButton from "../components/Button/BaseButton";
import { supabase } from "../supabase";
import CreateTodo from "../components/Todo/CreateTodo";
import Todo, { CoreTodoProps } from "../components/Todo/Todo";
import { insertTodo } from "../supabase/todo/insert";
import { SessionContext } from "../context/session";
import { TodoContext } from "../context/todo";
import { updateTodoDoneById } from "../supabase/todo/update";

function HomeScreen({ navigation, setContextTodos }) {
    const session = useContext(SessionContext);
    const todos = useContext(TodoContext);
    const [createTodo, setCreateTodo] = useState<CoreTodoProps>({
        done: false,
        text: "",
    });

    async function handleSignOut() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            Alert.alert("Failed to sign out", error.message);
        }
    }

    function handleCreateTodoTextChange(text: string) {
        setCreateTodo((prev) => ({
            ...prev,
            text: text,
        }));
    }

    function handleCreateDodoDone() {
        setCreateTodo((prev) => ({
            ...prev,
            done: !prev.done,
        }));
    }

    async function handleTodoSubmit() {
        if (createTodo.text.trim().length === 0) {
            Alert.alert("Failed to create todo", "Todo must have some content");
            return;
        }

        const { data, error } = await insertTodo({
            ...createTodo,
            user_id: session.user.id,
        });
        if (error) {
            Alert.alert("Failed to create todo", error.message);
        } else {
            setContextTodos([...todos, data[0]]);
        }
    }

    async function handleTodoDoneChange(id: string, done: boolean) {
        const newDoneState = !done;
        const { data, error } = await updateTodoDoneById(id, newDoneState);
        if (error) {
            Alert.alert("Failed to update todo's state", "Please try again");
        } else {
            setContextTodos(
                todos.map((todo) =>
                    todo.id === id
                        ? {
                              ...todo,
                              done: newDoneState,
                          }
                        : todo,
                ),
            );
        }
    }

    return (
        <BaseLayout>
            <BaseView className="relative h-full">
                <CreateTodo
                    done={createTodo.done}
                    text={createTodo.text}
                    onDoneClick={handleCreateDodoDone}
                    onChangeText={handleCreateTodoTextChange}
                    onSubmit={handleTodoSubmit}
                />

                <BaseView>
                    {todos.map((todo) => (
                        <Todo
                            key={todo.id}
                            done={todo.done}
                            text={todo.text}
                            onDoneClick={() =>
                                handleTodoDoneChange(todo.id, todo.done)
                            }
                        />
                    ))}
                </BaseView>

                <BaseButton
                    className="absolute top-[82.5%] left-[42%]"
                    onPress={handleSignOut}
                >
                    <BaseText>Sign out</BaseText>
                </BaseButton>
            </BaseView>
        </BaseLayout>
    );
}

export default HomeScreen;
