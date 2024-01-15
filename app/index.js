import { Text, SafeAreaView, ScrollView, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { COLORS, images, icons, SIZES } from "../constants";
import { Nearbyjobs, ScreenHeaderBtn, Welcome, Popularjobs } from "../components"



export default function Home() {
    // const router = useRouter()


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={
                    {
                        headerStyles: { backgroundColor: COLORS.lightWhite },
                        headerShadowVisible: true,
                        headerLeft: () => (
                            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
                        ),
                        headerRight: () => (
                            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
                        ),
                        headerTitle: ""
                    }
                }
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={{ flex: 1, padding: SIZES.medium }}
                >
                    <Welcome />
                    <Popularjobs />
                    <Nearbyjobs />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
