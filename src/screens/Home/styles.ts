import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#18122B'
    },
    title: {
        fontSize: 18,
        marginBottom: 40,
        textAlign: 'center',
        color: '#FFFFFF'
    },
    button: {
        width: 94,
        height: 94,
        borderRadius: 47,
        backgroundColor: '#212121',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 32
    }, 
    recording: {
        backgroundColor: '#1DB954'
    },
    listen: {
        width: 150,
        height: 50,
        backgroundColor: '#19A7CE',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    txtButton: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18
    },
})