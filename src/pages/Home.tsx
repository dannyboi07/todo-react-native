import React from "react";
import { View, Image, Pressable, Text } from "react-native";
import { styled, useColorScheme } from "nativewind";
const HeroImgDarkAssetPath = "../assets/bg-mobile-dark.jpg";
const HeroImgLightAssetPath = "../assets/bg-mobile-light.jpg";

const StyledView = styled(View);
const StyledImage = styled(Image);

function Home() {
    const { colorScheme } = useColorScheme();

    return (
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
    );
}

export default Home;
