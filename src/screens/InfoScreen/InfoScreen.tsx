import React, {FC, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import {fetchPerson, resetPersonState} from '../../store/peopleSlice';
import {useAppDispatch, useAppSelector} from '../../hooks';
import PersonInfo from '../../components/PersonInfo';

type InfoScreenProps = {
  route: any;
};

const InfoScreen: FC<InfoScreenProps> = ({route}) => {
  const selectedUrl = route.params.selectedUrl;

  const {person, loading, error} = useAppSelector(state => state.people);
  const dispatch = useAppDispatch();

  // Reseting page to initial state, when user leaves this page.
  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(resetPersonState());
      };
    }, [dispatch]),
  );

  useEffect(() => {
    dispatch(fetchPerson(selectedUrl));
  }, [selectedUrl, dispatch]);

  return (
    <View style={styles.container}>
      {error && (
        <Text style={styles.errorMessage}>An error occured: {error}</Text>
      )}
      {loading ? (
        <ActivityIndicator animating={true} style={styles.loadingIndicator} />
      ) : (
        <PersonInfo {...person} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
  errorMessage: {
    flex: 1,
    justifyContent: 'center',
    color: '#000',
  },
});

export default InfoScreen;
