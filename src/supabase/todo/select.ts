import { supabase } from "..";
import { PostgrestResponse } from "@supabase/supabase-js";
import { Todo } from "../supabase.types";

type TodosResponse = PostgrestResponse<Todo[]>;

export async function selectAllTodos(userId: string): Promise<TodosResponse> {
    return await supabase.from("todo_todo").select("*").eq("user_id", userId);
}
