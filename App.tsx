import { useState, useEffect, createContext } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styled, useColorScheme } from "nativewind";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const HeroImgDarkAssetPath = "./src/assets/bg-mobile-dark.jpg";
const HeroImgLightAssetPath = "./src/assets/bg-mobile-light.jpg";

type theme = "light" | "dark";

const getStoredTheme = async (): Promise<theme> => {
    let savedTheme: string | theme | null = await AsyncStorage.getItem("theme");
    if (!savedTheme) {
        savedTheme = JSON.stringify("dark");
        await AsyncStorage.setItem("theme", savedTheme);
    }
    return JSON.parse(savedTheme);
};

export const ThemeContext = createContext("dark");

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const Stack = createNativeStackNavigator();

export default function App() {
    // const [theme, setTheme] = useState<theme>("dark");
    // const [count, setCount] = useState(0);
    const { colorScheme, setColorScheme } = useColorScheme();

    useEffect(() => {
        getStoredTheme().then((storedTheme) => setColorScheme(storedTheme));
    }, []);

    async function changeTheme() {
        const newTheme: theme = colorScheme === "dark" ? "light" : "dark";
        // setTheme(newTheme);
        setColorScheme(newTheme);
        await AsyncStorage.setItem("theme", JSON.stringify(newTheme));
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <StyledView
                    className={`min-h-screen relative dark:bg-v-dark-blue light:v-dark-grayish-blue-2`}
                >
                    <StyledImage
                        source={
                            colorScheme === "dark"
                                ? require(HeroImgDarkAssetPath)
                                : require(HeroImgLightAssetPath)
                        }
                        className="w-full h-[30%] absolute"
                    />
                </StyledView>
                <Pressable
                    style={{ ...styles.button, backgroundColor: "red" }}
                    onPress={changeTheme}
                    android_ripple={{ color: "black" }}
                >
                    <Text
                        style={{
                            color: "white",
                        }}
                    >
                        Decrement {colorScheme}
                    </Text>
                </Pressable>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonCtn: {
        display: "flex",
        flexDirection: "row",
        columnGap: 8,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        color: "white",
        // elevation: 3,
        overflow: "hidden",
    },
});

{
    /* <View style={styles.buttonCtn}>
<Pressable
    style={{ ...styles.button, backgroundColor: "red" }}
    onPress={() => setCount((prev) => prev - 1)}
    android_ripple={{ color: "black" }}
>
    <Text
        style={{
            color: "white",
        }}
    >
        Decrement
    </Text>
</Pressable>
<Pressable
    style={{ ...styles.button, backgroundColor: "green" }}
    onPress={() => setCount((prev) => prev + 1)}
    android_ripple={{ color: "black" }}
>
    <Text style={{ color: "white" }}>Increment</Text>
</Pressable>
</View> */
}
