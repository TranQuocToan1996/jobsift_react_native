import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native'

import { SIZES, icons } from '../../../constants'
import styles from './welcome.style'
import { useRouter } from 'expo-router'


const jobTypes = ["Full-time", "Part-time", "Contractor"];
const Welcome = () => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full-time")

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello T</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            onChange={() => console.log("TODO")}
            value=''
            placeholder='What are you looking for?'
          />
        </View>
        <TouchableOpacity style={styles} onPress={() => console.log("TODO PressSearch")}>
          <Image
            source={icons.search}
            resizeMode='cover'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          keyExtractor={item => item}
          horizontal
          contentContainerStyle={{ columnGap: SIZES.small }}
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item)
                router.push(`/search/${item}`)
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View >
  )
}

export default Welcome