import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

function App(): JSX.Element {
  const [searchTxt, setSearchTxt] = useState<string>('');
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [filteredMovieList, setFilteredMovieList] = useState<Movie[]>([]);

  const API_KEY = 'd51e53edabf9af756902603816ddc83d'; //TODO: add to env

  const fetchMovieList = () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setMovieList(data?.results);
        setFilteredMovieList(data?.results);
      })
      .catch(error => console.error(error));
  };

  const searchMovie = (text: string) => {
    setSearchTxt(text);

    // console.log("Test data")
    // console.log(movieList)
    const filterMovies = movieList.filter(item => {
      return item?.original_title?.toLowerCase().includes(text.toLowerCase());
    });

    setFilteredMovieList(filterMovies);
  };

  const tilePressed = () => {};

  useEffect(() => {
    fetchMovieList();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.mainContainer}>
        <View style={styles.searchBarWrapper}>
          <TextInput
            style={styles.searchBar}
            value={searchTxt}
            maxLength={20}
            clearButtonMode="always"
            onChangeText={text => searchMovie(text)}
            placeholder="Search here"
          />
        </View>
      </View>
      <View>
        <FlatList
          style={styles.list}
          numColumns={1}
          data={filteredMovieList}
          renderItem={({item}) => (
            <Pressable style={styles.tileBtn} onPress={() => tilePressed}>
              <View style={styles.tileWrapper}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                  }}
                  style={styles.tileImage}
                />
                <View style={styles.tileTextWrapper}>
                  <Text style={styles.tileTitle}>{item.original_title}</Text>
                  <Text style={styles.tileOverview} numberOfLines={3}>
                    {item.overview}
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchBarWrapper: {
    marginBottom: 24,
  },
  searchBar: {
    height: 60,
    backgroundColor: '#E5E4EA',
    borderRadius: 10,
    fontSize: 18,
    paddingHorizontal: 10,
  },
  movieTile: {
    height: 20,
    width: 50,
    backgroundColor: '#324352',
  },
  tileBtn: {
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: '#EAF0F1',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tileWrap: {},
  tileImage: {
    height: 150,
    width: 120,
  },
  tileWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  list: {
    paddingHorizontal: 16,
    marginBottom: 200,
  },

  tileTextWrapper: {
    flex: 1,
    padding: 10,
  },
  tileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tileOverview: {
    fontSize: 14,
    color: 'gray',
  },
});

export default App;
