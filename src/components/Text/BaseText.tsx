import React from "react";
import { Text, TextProps } from "react-native";
import { styled } from "nativewind";

const StyledText = styled(Text);

interface Props extends TextProps {
    className?: string;
}

function BaseText({ className = "", children, ...props }: Props) {
    return (
        <StyledText
            className={["text-black dark:text-white", className].join(" ")}
            {...props}
        >
            {children}
        </StyledText>
    );
}

export default BaseText;
