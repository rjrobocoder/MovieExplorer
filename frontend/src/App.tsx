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
            onChangeText={text => searchMovie(text)}
            placeholder="Search here"
          />
        </View>
        <View>
          <FlatList
            numColumns={1}
            data={filteredMovieList}
            renderItem={({item}) => (
              <Pressable style={styles.tileBtn} onPress={() => tilePressed()}>
                <View style={styles.tileWrapper}>
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                    }}
                    style={styles.tileImage}
                  />
                  <View>
                    <Text>{item.original_title}</Text>
                    <Text numberOfLines={3}>{item.overview}</Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
        </View>
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
    backgroundColor: '#3C40C6',
    marginBottom: 16,
    // height: 100,
  },
  searchBar: {
    height: 60,
    // backgroundColor: '#534274',
    borderRadius: 10,
    fontSize: 18,
    paddingHorizontal: 10,
    // marginBottom: 15,
  },
  movieTile: {
    height: 20,
    width: 50,
    backgroundColor: '#324352',
  },
  tileBtn: {
    // height: 50,
    width: '100%',
    backgroundColor: 'red',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  tileWrap: {},
  tileImage: {
    height: 150,
    width: 120,
  },
  tileWrapper: {
    flex: 1,
    marginBottom: 5,
    flexDirection: 'row',
  },
});

export default App;
