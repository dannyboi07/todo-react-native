import React from "react";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import { styled } from "nativewind";

const StyledSpinner = styled(ActivityIndicator);

interface Props extends ActivityIndicatorProps {
    className?: string;
}

function BaseSpinner({ className = "", ...props }: Props) {
    return <StyledSpinner className={["", className].join(" ")} {...props} />;
}

export default BaseSpinner;
