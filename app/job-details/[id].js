import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
} from "react-native";

import {
    Company,
    JobAbout,
    JobFooter,
    JobTabs,
    ScreenHeaderBtn,
    Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

const tabs = ["About", "Qualifications", "Responsibilities"];

export default function JobDetail() {
    const router = useRouter()
    const params = useGlobalSearchParams()
    const { data, isLoading, error, refetch } = useFetch('job-details', {
        job_id: params.id
    })
    const [refreshing, setRefreshing] = useState(false)
    const [activeTab, setActiveTab] = useState(tabs[0])
    const onRefresh = useCallback(() => {
        if (refreshing) return
        setRefreshing(true)
        refetch()
        setRefreshing(false)
    }, [])
    const getTabContent = () => {
        switch (activeTab) {
            case "Qualifications":
                return (
                    <Specifics
                        title='Qualifications'
                        points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
                    />
                );

            case "About":
                return (
                    <JobAbout info={data[0].job_description ?? "No data provided"} />
                );

            case "Responsibilities":
                return (
                    <Specifics
                        title='Responsibilities'
                        points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
                    />
                );

            default:
                return null;
        }
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={
                    {
                        headerStyles: { backgroundColor: COLORS.lightWhite },
                        headerShadowVisible: false,
                        headerBackVisible: false,
                        headerLeft: () => (
                            <ScreenHeaderBtn iconUrl={icons.left} dimension="60%" handlePress={() => router.back()} />
                        ),
                        headerRight: () => (
                            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
                        ),
                        headerTitle: ""
                    }
                }
            />

            <>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {refreshing && <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    {isLoading && <ActivityIndicator size="large" color={COLORS.primary} />}
                    {error && <Text>{`Something when wrong ${error}`}</Text>}
                    {!isLoading && !error && data.length === 0 && <Text>No data</Text>}
                    {data.length > 0 && (
                        <>
                            <View style={{ padding: SIZES.medium }}>
                                <Company
                                    companyLogo={data[0].employer_logo}
                                    jobTitle={data[0].job_title}
                                    companyName={data[0].employer_name}
                                    location={data[0].job_country}
                                />

                                <JobTabs
                                    tabs={tabs}
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                />
                            </View>
                            {getTabContent()}
                        </>
                    )}
                </ScrollView>
            </>
            <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results/'} />

        </SafeAreaView>
    )
}
