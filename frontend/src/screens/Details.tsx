import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function Details({route}: DetailsProps) {
  const [movieDetails, setMovieDetails] = useState<Movie>();
  const {movieId} = route.params;
  const API_KEY = 'd51e53edabf9af756902603816ddc83d'; //TODO: add to env

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const fetchMovieDetailsById = () => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('Details');
        console.log(data);
        setMovieDetails(data);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchMovieDetailsById();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView style={{paddingHorizontal: 16}}>
        {movieDetails && (
          <>
            <View style={styles.headerImageContainer}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`,
                }}
                style={{height: '100%', width: '100%'}}
              />
            </View>
            <View>
              <View>
                <Text style={styles.title}>{movieDetails?.original_title}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Text
                  style={{fontSize: 16, fontWeight: '600', color: '#000000'}}>
                  ⭐ {movieDetails?.vote_average?.toFixed(1)}/10
                </Text>
                <Text style={{fontSize: 12, color: '#333333'}}>
                  {movieDetails?.vote_count} Votes
                </Text>
              </View>
              <View style={styles.language}>
                {movieDetails?.spoken_languages?.map(
                  (item: {name: string}, index) => (
                    <Text key={index} style={styles.languageTxt}>
                      {item?.name}
                    </Text>
                  ),
                )}
              </View>
              <View style={styles.release}>
                <Text>Release Date: {movieDetails?.release_date}</Text>
              </View>
              <View style={styles.description}>
                <Text style={styles.descriptionTxt}>
                  {movieDetails?.overview}
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImageContainer: {
    height: 250,
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 16,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
  },
  ratingContainer: {
    flex: 1,
    flexDirection: 'row',
    columnGap: 6,
    alignItems: 'baseline',
  },
  release: {
    marginTop: 6,
    fontSize: 12,
  },
  language: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },
  languageTxt: {
    fontWeight: '600',
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    paddingVertical: 2,
    paddingHorizontal: 5,
    fontSize: 12,
  },
  description: {
    marginTop: 8,
  },
  descriptionTxt: {
    textAlign: 'justify',
  },
});
