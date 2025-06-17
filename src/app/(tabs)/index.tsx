import { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import mediaList from '@assets/data/mediaList.json';
import MediaListItem from "@/components/MediaListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from '@expo/vector-icons/Feather';

export default function HomeSceen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'MOVIE' | 'TV_SERIES'>('ALL');




  const displayedMediaList = mediaList
    .map(section => {
      const filteredItems = section.data.filter(item => {
        const matchesTitle = (item.title || '').toLowerCase().includes(searchQuery.trim().toLowerCase());
        const matchesType = activeFilter === 'ALL' || item.type === activeFilter;
        return matchesTitle && matchesType;
      });

      return {
        ...section,
        data: filteredItems,
      };
    })
    .filter(section => section.data.length > 0);

  // If No Record Found
  const noResultsFound = searchQuery.trim() && displayedMediaList.length === 0;



  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>For Abdullah</Text>
          <Feather name="search" size={22} color="white" />
        </View>
        <TextInput
          placeholder="Search"
          placeholderTextColor="grey"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />

        <View style={styles.filterContainer}>
          <Text
            style={[
              styles.filterText,
              activeFilter === 'TV_SERIES' && styles.activeFilter
            ]}
            onPress={() => setActiveFilter(prev => prev === 'TV_SERIES' ? 'ALL' : 'TV_SERIES')}
          >
            TV Shows
          </Text>
          <Text
            style={[
              styles.filterText,
              activeFilter === 'MOVIE' && styles.activeFilter
            ]}
            onPress={() => setActiveFilter(prev => prev === 'MOVIE' ? 'ALL' : 'MOVIE')}
          >
            Movies
          </Text>
          <Text style={styles.filterText}>Categories</Text>
        </View>

      </View>

      {noResultsFound && (
        <Text style={styles.noResultsText}>No results found</Text>
      )}


      <FlatList
        data={displayedMediaList}
        keyExtractor={(item) => item.title}
        renderItem={({ item: verticalListItem }) => (
          <View>
            <Text style={styles.sectionTitle}>{verticalListItem.title}</Text>
            <FlatList
              horizontal
              data={verticalListItem.data}
              keyExtractor={(item) => item.id}
              renderItem={({ item: horizontalListItem }) => (
                <MediaListItem mediaItem={horizontalListItem} />
              )}
            />


          </View>
        )}
      />

    </SafeAreaView>
  );
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
  },
  searchInput: {
    backgroundColor: '#222',
    color: 'white',
    borderRadius: 10,
    padding: 8,
    marginTop: 5,
  },
  noResultsText: {
    color: 'lightgrey',
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
    fontStyle: 'italic',
  },
  activeFilter: {
    backgroundColor: 'white',
    color: 'black',
    borderColor: 'white',
  }
});