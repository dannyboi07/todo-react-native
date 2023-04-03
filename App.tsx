import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useColorScheme } from "nativewind";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./src/supabase";
import HomeScreen from "./src/pages/Home";
import AuthScreen from "./src/pages/Auth";
import { SessionContext } from "./src/context/session";
import { Todo } from "./src/supabase/supabase.types";
import { selectAllTodos } from "./src/supabase/todo/select";
import { TodoContext } from "./src/context/todo";
const Stack = createNativeStackNavigator();

export default function App() {
    const [session, setSession] = useState<Session | null>(null);
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        // supabase.auth.getSession().then(({ data: { authSession } }) => {
        //     console.log("recv", authSession);
        //     let session: Session | null = authSession;
        //     if (authSession) {
        //         const { data, error } = selectAllTodos(session?.user.id);
        //         if (error) {
        //             session = null;
        //         } else {
        //             setTodos(data);
        //         }
        //     }
        //     setSession(session);
        // });

        supabase.auth.onAuthStateChange((_event, authSession) => {
            // console.log("change sess", authSession);
            let session: Session | null = authSession;
            if (authSession) {
                selectAllTodos(session?.user.id)
                    .then(({ data }, error) => {
                        if (error) {
                            session = null;
                        } else {
                            setTodos(data ?? []);
                        }
                    })
                    .catch((err) => {
                        console.error("session err", err);
                        session = null;
                    });
            }
            setSession(session);
        });
    }, []);

    console.log(todos);

    return (
        <SessionContext.Provider value={session}>
            <TodoContext.Provider value={todos}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="Home"
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        {session ? (
                            <>
                                <Stack.Screen
                                    name="Home"
                                    // component={HomeScreen}
                                >
                                    {(props) => (
                                        <HomeScreen
                                            {...props}
                                            setContextTodos={setTodos}
                                        />
                                    )}
                                </Stack.Screen>
                            </>
                        ) : (
                            <>
                                <Stack.Screen
                                    name="Login"
                                    component={AuthScreen}
                                />
                            </>
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            </TodoContext.Provider>
        </SessionContext.Provider>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     buttonCtn: {
//         display: "flex",
//         flexDirection: "row",
//         columnGap: 8,
//     },
//     button: {
//         paddingVertical: 8,
//         paddingHorizontal: 16,
//         borderRadius: 8,
//         color: "white",
//         overflow: "hidden",
//     },
// });
