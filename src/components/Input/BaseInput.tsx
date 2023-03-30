import React from "react";
import {
    TextInput,
    TextInputProps,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { styled } from "nativewind";

const StyledTextInput = styled(TextInput);

interface Props extends TextInputProps {
    className?: string;
}

function BaseTextInput({ className = "", children, ...props }: Props) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "android" ? "height" : "padding"}
        >
            <StyledTextInput
                className={[
                    "text-black dark:text-white rounded-md",
                    className,
                ].join(" ")}
                placeholderTextColor="#9394A5"
                {...props}
            />
        </KeyboardAvoidingView>
    );
}

export default BaseTextInput;
