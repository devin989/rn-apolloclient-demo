import React from 'react';
import { View, FlatList, RefreshControl,StyleSheet, } from 'react-native';

import { Appbar, Card, Paragraph } from 'react-native-paper';
import {useQuery} from "@apollo/client";
import {CHARACTERS} from "../query";
// import { GetUserDetails } from '../services/react-query/queries/user';



const Home = () => {

    // const setIsLoggedIn = useStore(state => state.setIsLoggedIn);
    const { loading, error, data={ results: [] } } = useQuery(CHARACTERS);
    // const { isLoading, error, data = { results: [] } } = userApi.endpoints.getCharacters.useQuery();

    console.log( data.characters);
    // console.log("isFetching"+ isFetching);
    if(error){
        return (
            <View style={styles.container}>
                <Paragraph>
                    Error
                </Paragraph>
            </View>
        )
    }
    if(loading){
        return (
            <View style={styles.container}>
                <Paragraph>
                    Loading
                </Paragraph>
            </View>
        )
    }
    // const onLogOut = () => {
    //   setIsLoggedIn(false);
    // };

    // @ts-ignore
    const renderItem = ({ item }) => (
        <Card style={styles.card} mode="elevated">
            <Card.Cover source={{ uri: item.image }} />
            <Card.Title title={item.name} />
            <Card.Content>
                <View style={styles.content}>
                    <Paragraph>Status: {item.status}</Paragraph>
                    <Paragraph>Species: {item.species}</Paragraph>
                    <Paragraph>Gender: {item.gender}</Paragraph>
                </View>
            </Card.Content>
        </Card>
    );

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Apollo Client" subtitle="All Characters" />

            </Appbar.Header>

            <FlatList
                data={data.characters.results}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={() => {}}
                    />
                }
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        margin: 4,
    },
    content: { flexDirection: 'row', justifyContent: 'space-between' },
});

export default Home;
