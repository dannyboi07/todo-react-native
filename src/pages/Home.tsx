import React from "react";
import { Alert } from "react-native";
import BaseLayout from "../layouts/BaseLayout";
import BaseView from "../components/View/BaseView";
import BaseText from "../components/Text/BaseText";
import BaseButton from "../components/Button/BaseButton";
import { supabase } from "../supabase";

function HomeScreen({ navigation }) {
    async function handleSignOut() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            Alert.alert("Failed to sign out", error.message);
        }
    }

    return (
        <BaseLayout>
            <BaseView className="relative h-full">
                <BaseView>
                    <BaseText>Home page</BaseText>
                </BaseView>

                <BaseButton
                    className="absolute top-[82.5%] left-[42.5%]"
                    onPress={handleSignOut}
                >
                    <BaseText>Sign out</BaseText>
                </BaseButton>
            </BaseView>
        </BaseLayout>
    );
}

export default HomeScreen;
