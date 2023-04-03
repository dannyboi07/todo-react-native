import React from "react";
import { View, ViewProps } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);

export interface BaseViewProps extends ViewProps {
    className?: string;
}

function BaseView({ className = "", children, ...props }: BaseViewProps) {
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
