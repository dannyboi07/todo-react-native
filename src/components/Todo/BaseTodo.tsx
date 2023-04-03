import React from "react";
import { Image } from "react-native";
import { styled } from "nativewind";
import { LinearGradient } from "expo-linear-gradient";
import BaseView, { BaseViewProps } from "../View/BaseView";
import { CoreTodoProps } from "./Todo";
import BaseButton from "../Button/BaseButton";
const IconCheckAssetPath = "../../assets/icon-check.png";

const StyledLinearGradient = styled(LinearGradient);

function CheckedImage() {
    return (
        <StyledLinearGradient
            className="w-full h-full flex items-center justify-center"
            colors={["hsl(192, 100%, 67%)", "hsl(280, 87%, 65%)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <Image source={require(IconCheckAssetPath)} />
        </StyledLinearGradient>
    );
}

export interface BaseTodoProps extends Omit<CoreTodoProps, "text"> {
    children: JSX.Element;
    containerProps?: BaseViewProps;
    onDoneClick: () => void;
}

function BaseTodo({
    done,
    onDoneClick,
    containerProps = {},
    children,
}: BaseTodoProps) {
    const containerClassNameProp = containerProps.className ?? "";

    return (
        <BaseView
            {...containerProps}
            className={[
                `w-full 
                px-5 
                py-3 
                flex 
                flex-row 
                space-x-4 
                items-center 
                bg-v-light-gray 
                dark:bg-v-dark-grayish-blue-2 
                rounded-md`,
                containerClassNameProp,
            ].join(" ")}
        >
            <BaseButton
                className={`w-6 h-6 flex items-center justify-center border border-light-grayish-blue dark:border-v-dark-grayish-blue rounded-full overflow-hidden`}
                onPress={onDoneClick}
            >
                {done && <CheckedImage />}
            </BaseButton>
            <BaseView className="flex-1 h-full">{children}</BaseView>
        </BaseView>
    );
}

export default BaseTodo;
