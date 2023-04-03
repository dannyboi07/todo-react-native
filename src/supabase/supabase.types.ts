export interface Database {
    public: {
        Tables: {
            todo: {
                Row: {};
                Insert: {};
                Update: {};
                Delete: {};
            };
        };
    };
}

export interface CreateTodo {
    user_id: string;
    done: boolean;
    text: string;
}

export interface Todo extends CreateTodo {
    id: string;
    created_at: Date;
}


// type TodosResponse = Awaited<ReturnType<typeof insertTodo>>;
// export type TodosResponseSuccess = TodosResponse["data"];
// export type TodosResponseError = TodosResponse["error"];
