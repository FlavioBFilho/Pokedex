import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import api from '../services/api';

const PokeCard = ({ url }) => {

    const [pokemonData, setPokemonData] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(url)
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
            <Text>{ pokemonData.name.toUpperCase() }</Text>
            <Image source={{ uri: pokemonData.sprites.front_default }} style={{ width: 100, height: 100 }} />
        </View>
    );
}

export default PokeCard;