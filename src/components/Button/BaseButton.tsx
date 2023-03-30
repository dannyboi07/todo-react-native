import React from "react";
import { Pressable, PressableProps } from "react-native";
import { styled } from "nativewind";
import BaseView from "../View/BaseView";

const StyledButton = styled(Pressable);

interface Props extends PressableProps {
    className?: string;
}

function BaseButton({ className = "", children, ...props }: Props) {
    return (
        // <BaseView>
            <StyledButton
                className={[
                    "rounded-md flex content-center justify-center transition-all",
                    className,
                ].join(" ")}
                // android_ripple={{ borderless: true }}
                {...props}
            >
                {children}
            </StyledButton>
        // </BaseView>
    );
}

export default BaseButton;
