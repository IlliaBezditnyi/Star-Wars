import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import {DataTable, Icon, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  fetchPeople,
  likePerson,
  dislikePerson,
  addToFavourite,
  removeFromFavourite,
  pagination,
  clearFavourites,
} from '../store/peopleSlice';
import {useAppDispatch, useAppSelector} from '../hooks';
import Counter from './Counter';

const PeopleList: FC = () => {
  const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const people = useAppSelector(state => state.people.list);
  const {count, counter, firstPersonIdx, lastPersonIdx, loading} =
    useAppSelector(state => state.people);

  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 10;
  const pagesCount = Math.ceil(count / itemsPerPage);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, count);

  const likePersonFunc = (like: boolean, idx: number, gender: string) => {
    if (like) {
      dispatch(dislikePerson(idx));
      dispatch(removeFromFavourite(gender));
    } else {
      dispatch(likePerson(idx));
      dispatch(addToFavourite(gender));
    }
  };

  useEffect(() => {
    if (people.length < itemsPerPage * page) {
      dispatch(fetchPeople(page));
    }
    dispatch(pagination(page));
  }, [dispatch, page, people]);

  return (
    <View style={styles.container}>
      <Counter {...counter} onPress={() => dispatch(clearFavourites())} />
      <DataTable style={styles.table}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>
            <Icon source="heart" size={24} />
          </DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Birth</DataTable.Title>
          <DataTable.Title>Gender</DataTable.Title>
        </DataTable.Header>
        {loading ? (
          <Button mode="text" loading={true}>
            Loading data
          </Button>
        ) : (
          people
            .slice(firstPersonIdx, lastPersonIdx)
            .map((person: any, index: any) => {
              return (
                <DataTable.Row
                  key={index.toString()}
                  onPress={() => {
                    navigate('InfoScreen', {selectedUrl: person.url});
                  }}>
                  <DataTable.Cell>
                    <Pressable
                      key={index.toString()}
                      onPress={() => {
                        likePersonFunc(
                          person.liked,
                          person.index,
                          person.gender,
                        );
                      }}>
                      <Icon
                        source={person.liked ? 'heart' : 'heart-outline'}
                        color="red"
                        size={24}
                      />
                    </Pressable>
                  </DataTable.Cell>
                  <DataTable.Cell>{person.name}</DataTable.Cell>
                  <DataTable.Cell>{person.birth_year}</DataTable.Cell>
                  <DataTable.Cell>{person.gender}</DataTable.Cell>
                </DataTable.Row>
              );
            })
        )}

        <DataTable.Pagination
          page={page}
          numberOfPages={pagesCount}
          onPageChange={currentPage => setPage(currentPage)}
          label={`${from + 1}-${to} of ${count}`}
        />
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 15,
  },
  table: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingBottom: 10,
  },
  tableHeader: {
    backgroundColor: '#f6f5f3',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  likeIcon: {
    backgroundColor: 'none',
  },
});

export default PeopleList;
