import { supabase } from "..";
import { PostgrestResponse } from "@supabase/supabase-js";
import { CreateTodo, Todo } from "../supabase.types";

type TodoResponse = PostgrestResponse<Todo>;

export async function insertTodo(todo: CreateTodo): Promise<TodoResponse> {
    return await supabase.from("todo_todo").insert({ ...todo }).select();
};
