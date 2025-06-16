import { View, Text, FlatList, StyleSheet } from "react-native";
import mediaList from '@assets/data/mediaList.json';
import MediaListItem from "@/components/MediaListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from '@expo/vector-icons/Feather';

export default function HomeSceen() {
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>For Lukas</Text>
          <Feather name="search" size={22} color="white" />
        </View>
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>TV Shows</Text>
          <Text style={styles.filterText}>Movies</Text>
          <Text style={styles.filterText}>Categories</Text>
        </View>
      </View>
      <FlatList
        data={mediaList}
        renderItem={({ item: verticalListItem }) => (
          <View>
            <Text style={styles.sectionTitle}>{verticalListItem.title}</Text>
            <FlatList
              horizontal
              data={verticalListItem.data}
              renderItem={({ item: horizontalListItem }) => <MediaListItem mediaItem={horizontalListItem} />}
            />
          </View>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 17,
    color: 'white',
    fontWeight: '700',
    paddingVertical: 10
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterText: {
    color: 'lightgrey',
    fontSize: 12,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 15,
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 5
  },
  headerContainer: {
    marginHorizontal: 10,
    gap: 10
  }
});