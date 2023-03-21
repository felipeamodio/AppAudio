import {useState, useEffect} from 'react';
import { View, Text, Pressable, Alert, TouchableOpacity } from 'react-native';

import {MaterialIcons} from '@expo/vector-icons';
import {Audio, InterruptionModeIOS, InterruptionModeAndroid} from 'expo-av';

import {styles} from './styles'; 

export default function Home() {
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [recordingFileURI, setRecordingFileURI] = useState<string | null>(null);

    //start to recording
    async function handleRecordingStart() {
        const {granted} = await Audio.getPermissionsAsync();

        if(granted){
            try {
                const {recording} = await Audio.Recording.createAsync();
                setRecording(recording);
            } catch (error) {
                console.log(error);
                Alert.alert('Error recording', 'Unable to start audio recording');
            }
        }
    }

    //stop recording
    async function handleRecordingStop() {
        try {
            if(recording){
                await recording.stopAndUnloadAsync();
                const fileUri = recording.getURI(); //returns the address where the recording is saved
                setRecordingFileURI(fileUri);
                setRecording(null);
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error recording', 'Unable to stop audio recording');
        }
    }

    //listen the audio
    async function handleAudioPlay() {
        if(recordingFileURI){
            const {sound} = await Audio.Sound.createAsync({uri: recordingFileURI}, {shouldPlay: true});

            await sound.setPositionAsync(0); // 0 is to ensure that the audio starts playing from the beginning
            await sound.playAsync(); //play audio
        }
    }

    useEffect(() => {
        Audio
        .requestPermissionsAsync() //asking permission to use device audio
        .then(({granted}) => {
            if(granted){
               Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                interruptionModeIOS: InterruptionModeIOS.DoNotMix,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
                playThroughEarpieceAndroid: true
               }) 
            }
        })
    }, [])

  return (
    <View style={styles.container}>
        {!recording && <Text style={styles.title}>{`Click the audio button and\nmake your recordings`}</Text>}
        <Pressable 
            style={[styles.button, recording && styles.recording]} 
            onPressIn={handleRecordingStart}
            onPressOut={handleRecordingStop}>
            <MaterialIcons 
                name='mic'
                size={44}
                color='#FFFFFF'
            />
        </Pressable>
       {
        recording &&  <Text style={styles.label}>Recording...</Text>
       }

       {
        recordingFileURI &&
        <TouchableOpacity style={styles.listen} onPress={handleAudioPlay}>
            <Text style={styles.txtButton}>Listen Audio</Text>
       </TouchableOpacity>
       }
    </View>
  );
}