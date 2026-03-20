import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import api from '../services/api';
import PokeCard from './PokeCard';

const PokeList = () => {
    const [pokemonData, setPokemonData] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/pokemon?limit=151')
        .then(response => {
            setPokemonData(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    if(loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <View>
            <FlatList
                data={ pokemonData.results }
                renderItem={({ item }) => <PokeCard url={ item.url }/>}
            />
        </View>
    );
};

export default PokeList;