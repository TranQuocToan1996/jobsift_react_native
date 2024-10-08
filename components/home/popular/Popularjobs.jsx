import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch"

const Popularjobs = () => {
  const router = useRouter()
  const { data, isLoading, error, refetch } = useFetch('search', {
    query: 'React',
    num_pages: "1"
  })

  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`)
    setSelectedJob(item.job_id)
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity
          onPress={console.log("TODO")}
        >
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? <ActivityIndicator size="large" color={COLORS.primary} /> :
          error ? <Text>{`Something went wrong ${error}`}</Text> :
            <FlatList
              data={data}
              keyExtractor={item => item.job_id}
              renderItem={({ item }) => (
                <PopularJobCard item={item} selectedJob={selectedJob} handleCardPress={handleCardPress} />
              )}
              contentContainerStyle={{ columnGap: SIZES.medium }}
              horizontal
            />
        }
      </View>
    </View >
  )
}

export default Popularjobs