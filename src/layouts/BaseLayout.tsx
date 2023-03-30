import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";
import { styled, useColorScheme } from "nativewind";
import BaseButton from "../components/Button/BaseButton";
import BaseView from "../components/View/BaseView";
import BaseText from "../components/Text/BaseText";
const HeroImgDarkAssetPath = "../assets/bg-mobile-dark.jpg";
const HeroImgLightAssetPath = "../assets/bg-mobile-light.jpg";
const MoonIconAssetPath = "../assets/icon-moon.png";
const SunIconAssetPath = "../assets/icon-sun.png";

type theme = "light" | "dark";

const getStoredTheme = async (): Promise<theme> => {
    let savedTheme: string | theme | null = await AsyncStorage.getItem("theme");
    if (!savedTheme) {
        savedTheme = JSON.stringify("dark");
        await AsyncStorage.setItem("theme", savedTheme);
    }
    return JSON.parse(savedTheme);
};

interface Props {
    children: JSX.Element;
}

const StyledImage = styled(Image);

function BaseLayout({ children }: Props) {
    const { colorScheme, setColorScheme } = useColorScheme();

    useEffect(() => {
        getStoredTheme().then((storedTheme) => setColorScheme(storedTheme));
    }, []);

    async function changeTheme() {
        const newTheme: theme = colorScheme === "dark" ? "light" : "dark";
        setColorScheme(newTheme);
        await AsyncStorage.setItem("theme", JSON.stringify(newTheme));
    }

    return (
        <BaseView
            className={`min-h-screen relative py-11 dark:bg-v-dark-blue light:bg-v-dark-grayish-blue-2`}
            style={{}}
        >
            <StyledImage
                source={
                    colorScheme === "dark"
                        ? require(HeroImgDarkAssetPath)
                        : require(HeroImgLightAssetPath)
                }
                className="w-full h-[30%] absolute"
            />
            <BaseView className="px-7 py-2">
                <BaseView className="flex flex-row justify-between items-center">
                    <BaseText
                        className={`text-4xl font-bold dark:text-white light:text-black`}
                        style={{
                            letterSpacing: 5,
                        }}
                    >
                        TODO
                    </BaseText>
                    <BaseButton onPress={changeTheme}>
                        <StyledImage
                            source={
                                colorScheme === "dark"
                                    ? require(SunIconAssetPath)
                                    : require(MoonIconAssetPath)
                            }
                        />
                    </BaseButton>
                </BaseView>
                <BaseView className="mt-8">{children}</BaseView>
            </BaseView>
        </BaseView>
    );
}

export default BaseLayout;
