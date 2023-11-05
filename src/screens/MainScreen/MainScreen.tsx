import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useAppSelector} from '../../hooks';
import PeopleList from '../../components/PeopleList';

const MainScreen: FC = () => {
  const {error} = useAppSelector(state => state.people);

  return (
    <View style={styles.container}>
      {error && (
        <Text style={styles.errorMessage}>An error occured: {error}</Text>
      )}
      <PeopleList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
  },
  errorMessage: {
    flex: 1,
    justifyContent: 'center',
    color: '#000',
  },
});

export default MainScreen;
