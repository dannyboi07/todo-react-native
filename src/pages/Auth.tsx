import React, { useState, useEffect } from "react";
import { Alert, ActivityIndicator } from "react-native";
import BaseLayout from "../layouts/BaseLayout";
import BaseText from "../components/Text/BaseText";
import BaseView from "../components/View/BaseView";
import BaseTextInput from "../components/Input/BaseInput";
import BaseButton from "../components/Button/BaseButton";
import BaseSpinner from "../components/Spinner/BaseSpinner";
import { useColorScheme } from "nativewind";
import { supabase } from "../supabase";

enum AuthFieldEnum {
    EMAIL = "email",
    PASSWORD = "password",
}

function AuthScreen({ navigation }) {
    const { colorScheme } = useColorScheme();
    const [authInput, setAuthInput] = useState({
        [AuthFieldEnum.EMAIL]: "",
        [AuthFieldEnum.PASSWORD]: "",
    });
    const [authLoading, setAuthLoading] = useState({
        signIn: false,
        signUp: false,
    });

    const handleInputChange = (fieldName: AuthFieldEnum) => (input: string) => {
        setAuthInput((prev) => ({
            ...prev,
            [fieldName]: input,
        }));
    };

    async function handleSignIn() {
        setAuthLoading((prev) => ({
            ...prev,
            signIn: true,
        }));
        const { error } = await supabase.auth.signInWithPassword({
            email: authInput.email,
            password: authInput.password,
        });

        if (error) {
            Alert.alert("Failed to sign in", error.message, undefined, {
                userInterfaceStyle: colorScheme,
            });
        }

        setAuthLoading((prev) => ({
            ...prev,
            signIn: false,
        }));
    }

    async function handleSignUp() {
        setAuthLoading((prev) => ({
            ...prev,
            signUp: true,
        }));
        const { error } = await supabase.auth.signUp({
            email: authInput.email,
            password: authInput.password,
        });

        if (error) {
            Alert.alert("Failed to sign up", error.message, undefined, {
                userInterfaceStyle: colorScheme,
            });
        }

        setAuthLoading((prev) => ({
            ...prev,
            signUp: false,
        }));
    }

    useEffect(() => {
        // Alert.alert("alert", "", undefined, {
        //     userInterfaceStyle: "light",
        // });
    }, []);

    return (
        <BaseLayout>
            <BaseView className="flex gap-y-0">
                <BaseText className="text-2xl">Login</BaseText>

                <BaseView className="flex gap-y-3">
                    <BaseTextInput
                        className="text-base px-3 py-2 bg-v-light-gray dark:bg-v-dark-desat-blue"
                        textContentType="emailAddress"
                        autoCapitalize="none"
                        placeholder="Email"
                        value={authInput.email}
                        onChangeText={handleInputChange(AuthFieldEnum.EMAIL)}
                    />
                    <BaseTextInput
                        className="text-base px-3 py-2 bg-v-light-gray dark:bg-v-dark-desat-blue"
                        textContentType="password"
                        placeholder="Password"
                        value={authInput.password}
                        onChangeText={handleInputChange(AuthFieldEnum.PASSWORD)}
                        secureTextEntry
                    />
                    <BaseView className="w-full h-12 flex flex-row justify-between space-x-4">
                        <BaseButton
                            className="bg-v-dark-grayish-blue dark:bg-light-grayish-blue-2 flex-1"
                            onPress={handleSignIn}
                            disabled={authLoading.signIn || authLoading.signUp}
                        >
                            {authLoading.signIn ? (
                                <ActivityIndicator
                                    color={"#9394A5"}
                                    size={25}
                                />
                            ) : (
                                <BaseText className="text-white dark:text-black text-center">
                                    Sign in
                                </BaseText>
                            )}
                        </BaseButton>

                        <BaseButton
                            className="bg-v-dark-grayish-blue dark:bg-light-grayish-blue-2 flex-1"
                            onPress={handleSignUp}
                            disabled={authLoading.signUp || authLoading.signIn}
                        >
                            {authLoading.signUp ? (
                                <ActivityIndicator
                                    color={"#9394A5"}
                                    size={25}
                                />
                            ) : (
                                <BaseText className="text-white dark:text-black text-center">
                                    Sign up
                                </BaseText>
                            )}
                        </BaseButton>
                    </BaseView>
                </BaseView>
            </BaseView>
        </BaseLayout>
    );
}

export default AuthScreen;
