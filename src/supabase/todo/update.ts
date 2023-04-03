import { PostgrestResponse } from "@supabase/supabase-js";
import { supabase } from "..";
import { Todo } from "../supabase.types";

type TodoResponse = PostgrestResponse<Todo>;

export async function updateTodoDoneById(id: string, done: boolean): Promise<TodoResponse> {
    return await supabase.from("todo_todo").update({ done: done }).eq("id", id).select();
}
