import React from "react";
import { View, ViewProps } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);

interface Props extends ViewProps {
    className?: string;
}

function BaseView({ className = "", children, ...props }: Props) {
    return (
        <StyledView
            className={["transition-all", className].join(" ")}
            {...props}
        >
            {children}
        </StyledView>
    );
}

export default BaseView;
