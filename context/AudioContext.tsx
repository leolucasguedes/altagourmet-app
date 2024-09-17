import React, { createContext, useState, useRef, useContext, ReactNode, useEffect } from 'react';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import * as Notifications from 'expo-notifications';

export interface RadioStation {
    id: number;
    name: string;
    streamUrl: string;
    sound: Audio.Sound | null;
}

interface AudioContextType {
    isPlaying: boolean;
    loading: boolean;
    playAudio: (streamUrl: string) => Promise<void>;
    pauseAudio: () => Promise<void>;
    currentStreamUrl: string | null;
    setVolume: (volume: number) => Promise<void>;
    volume: number;
    stations: RadioStation[];
    preloadStations: (stations: RadioStation[]) => Promise<void>;
}

export const radios: RadioStation[] = [
    { id: 1, name: 'Popular', streamUrl: 'https://stm1.playstm.com:7018/;stream', sound: null },
    { id: 2, name: 'Sertanejo', streamUrl: 'https://stm1.playstm.com:7014/;stream', sound: null },
    { id: 3, name: 'Gospel', streamUrl: 'https://stm1.playstm.com:7016/;stream', sound: null },
    { id: 4, name: 'Pagode', streamUrl: 'https://stm1.playstm.com:7022/;stream', sound: null },
];

const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface AudioProviderProps {
    children: ReactNode;
}
let notificationId: string | null = null;

export const showAudioNotification = async (isPlaying: boolean, radioName: string) => {
    const buttonTitle = isPlaying ? 'Pause' : 'Play';
    const actionIdentifier = isPlaying ? 'pause' : 'play';
    const icon = isPlaying ? '/images/pause-icon.png' : '/images/play-icon.png';

    await Notifications.setNotificationCategoryAsync("audio-controls", [
        { identifier: actionIdentifier, buttonTitle, options: { opensAppToForeground: false, isAuthenticationRequired: false } },
    ]);
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: true,
        }),
    });

    // Exibir a notificação
    const notificationCreated = await Notifications.scheduleNotificationAsync({
        content: {
            title: "Nativa",
            body: `Você está ouvindo a rádio ${radioName}!`,
            categoryIdentifier: "audio-controls",
        },
        trigger: null,
    });
    if (notificationId) {
        await Notifications.dismissNotificationAsync(notificationId);
    }
    notificationId = notificationCreated;
};

export const AudioProvider = ({ children }: AudioProviderProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentStreamUrl, setCurrentStreamUrl] = useState<string | null>(null);
    const [volume, setVolumeState] = useState<number>(1.0);
    const [stations, setStations] = useState<RadioStation[]>(radios);
    const sound = useRef(new Audio.Sound());

    useEffect(() => {
        // Definir o comportamento das notificações
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: false,
                shouldSetBadge: false,
            }),
        });

        // Solicitar permissões para notificações
        const requestPermissions = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permissão de notificação negada');
            }
        };

        requestPermissions();
    }, []);

    useEffect(() => {
        const configureAudio = async () => {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                interruptionModeIOS: InterruptionModeIOS.DuckOthers,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
                playThroughEarpieceAndroid: false,
                staysActiveInBackground: true,
            });

            await preloadStations(radios);
        };

        configureAudio();

        return () => {
            if (sound.current) {
                sound.current.unloadAsync();
            }
        };
    }, []);

    const preloadStations = async (st: RadioStation[]) => {
        setLoading(true);

        const newStations = await Promise.all(st.map(async (station) => {
            try {
                const { sound } = await Audio.Sound.createAsync(
                    { uri: station.streamUrl },
                    { shouldPlay: false }
                );
                return { ...station, sound };
            } catch (error) {
                console.error('Erro ao pré-carregar estação:', error);
                return station; // Retorna a estação original em caso de erro
            }
        }));

        setStations(newStations);
        setLoading(false);
    };

    const playAudio = async (streamUrl: string) => {
        if (loading) return;
        if (currentStreamUrl === streamUrl && isPlaying) {
            return;
        }

        const station = stations.find((station) => station.streamUrl === streamUrl);

        if (station) {
            try {
                if (station.sound?.playAsync) {
                    await station.sound.playAsync();
                    if (isPlaying && sound.current) {
                        await sound.current.setStatusAsync({ shouldPlay: false });
                    }
                    sound.current = station.sound;
                } else {
                    const { sound: newSound } = await Audio.Sound.createAsync(
                        { uri: station.streamUrl },
                        { shouldPlay: true }
                    );
                    if (isPlaying && sound.current) {
                        await sound.current.setStatusAsync({ shouldPlay: false });
                    }
                    sound.current = newSound;
                    const newStations = stations.map(s =>
                        s.streamUrl === streamUrl ? { ...s, sound: newSound } : s
                    );
                    setStations(newStations);
                }
                setIsPlaying(true);
                setCurrentStreamUrl(streamUrl);
                await showAudioNotification(true, station.name);
            } catch (error) {
                console.error('Erro ao reproduzir áudio:', error);
            }
        }
    };

    const pauseAudio = async () => {
        if (sound.current) {
            try {
                await sound.current.pauseAsync();
                setIsPlaying(false);
                const station = stations.find((station) => station.streamUrl === currentStreamUrl);
                await showAudioNotification(false, station?.name || 'Nativa');
            } catch (error) {
                console.error('Erro ao pausar áudio:', error);
            }
        }
    };

    useEffect(() => {
        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            if (loading) {
                return
            }
            const identifier = response.actionIdentifier;
            if (identifier === 'pause') {
                pauseAudio();
            } else if (identifier === 'play') {
                if (currentStreamUrl) {
                    playAudio(currentStreamUrl);
                }
            }
        });

        return () => {
            subscription.remove();
        };
    }, [pauseAudio, playAudio, currentStreamUrl]);

    const setVolume = async (volume: number) => {
        setVolumeState(volume);
        if (sound.current) {
            try {
                await sound.current.setVolumeAsync(volume);
            } catch (error) {
                console.error('Erro ao alterar volume:', error);
            }
        }
    };

    return (
        <AudioContext.Provider value={{ isPlaying, playAudio, pauseAudio, currentStreamUrl, loading, setVolume, volume, preloadStations, stations }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = (): AudioContextType => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};
