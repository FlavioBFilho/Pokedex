import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/colors';
import api from '../services/api';

const PokeCard = ({ url }) => {

    const [pokemonData, setPokemonData] = useState(0);
    const [loading, setLoading] = useState(true);
    const onPress = () => { console.log('Ok'); };

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
        <View style={styles.container}>
            <TouchableOpacity style={[styles.card, {backgroundColor: COLORS[pokemonData.types[0].type.name]}]} onPress={onPress}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>#{ pokemonData.id.toString().padStart(3, '0') }{"\n"}{ pokemonData.name.toUpperCase() }</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: pokemonData.sprites.front_default }} style={ styles.image } />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        flexDirection: 'row',
    },

    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 5,
        paddingVertical: 2,
    },

    textContainer: {
        marginBottom: 8,
        width: '50%',
        fontWeight: 'bold',
    },

    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 1,
        fontSize: 20,
    },

    imageContainer: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    image: {
        width: 150,
        height: 150,
    }
});

export default PokeCard;