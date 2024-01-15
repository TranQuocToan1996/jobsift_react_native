import { TouchableOpacity, FlatList, Text, View } from "react-native";

import styles from "./tabs.style";
import { SIZES } from "../../../constants";

const TabButon = ({ name, activeTab, onHandleSearchType }) => {
  return (
    <TouchableOpacity style={styles.btn(name, activeTab)} onPress={onHandleSearchType}>
      <Text style={styles.btnText(name, activeTab)}>
        {name}
      </Text>
    </TouchableOpacity>
  )
}

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
        keyExtractor={data => data}
        data={tabs}
        renderItem={({ item }) => (
          <TabButon
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item)}
          />
        )}
      >
        Tabs
      </FlatList>
    </View>
  )
}

export default Tabs