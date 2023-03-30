import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useColorScheme } from "nativewind";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./src/supabase";
import HomeScreen from "./src/pages/Home";
import AuthScreen from "./src/pages/Auth";
const Stack = createNativeStackNavigator();

export default function App() {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { authSession } }) => {
            console.log("recv", authSession);
            setSession(authSession);
        });

        supabase.auth.onAuthStateChange((_event, authSession) => {
            setSession(authSession);
        });
    }, []);

    console.log(session);

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    {session ? (
                        <>
                            <Stack.Screen name="Home" component={HomeScreen} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="Login" component={AuthScreen} />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </>
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
