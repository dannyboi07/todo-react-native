import { createContext } from "react";
import { Todo } from "../supabase/supabase.types";

export const TodoContext = createContext<Todo[]>([]);
