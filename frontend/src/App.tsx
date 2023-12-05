import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const [searchTxt, setSearchTxt] = useState<string>('');
  const [movieList, setMovieList] = useState<Movie[]>();

  const fetchMovieList = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTFlNTNlZGFiZjlhZjc1NjkwMjYwMzgxNmRkYzgzZCIsInN1YiI6IjY1NmVjN2I1ODg2MzQ4MDE0ZDg1Y2JiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O6o37VWCHSm5v7v1MVwxOqE6IYZ6fX5kXguTx5zRqp4',
      },
    };

    fetch(
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
      options,
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setMovieList(response?.results);
      })
      .catch(err => console.error(err));
  };

  const searchMovie = () => {
    const filterMovies = movieList?.filter((item) => (
      item.original_title?.toLowerCase().includes(searchTxt.toLowerCase())
    ))

    setMovieList(filterMovies)
  }

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
            onChangeText={(text) => {
              setSearchTxt(text)
              searchMovie
            }}
            placeholder="Search here"
          />
        </View>
        <View>
          <FlatList
            numColumns={1}
            data={movieList}
            renderItem={({item}) => (
              <Pressable style={styles.tileBtn} onPress={() => tilePressed()}>
                <View style={styles.tileWrapper}>
                  <Image
                    source={{
                      uri: 'https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTZ8fGJhY2tncm91bmQlMjBpbWFnZXxlbnwwfHx8fDE3MDE3MDc5Mjh8MA&ixlib=rb-4.0.3',
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
    overflow: 'hidden'
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
