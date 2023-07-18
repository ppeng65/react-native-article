import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key: string, value: string | object) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }

    return await AsyncStorage.setItem(key, value);
}

export const getItem = async (key: string) => {
    const value = await AsyncStorage.getItem(key) || '';

    try {
        return JSON.parse(value);
    } catch (error) {
        return value;
    }
}

export const removeItem = async (key: string) => {
    return await AsyncStorage.removeItem(key);
}

export const clear = async () => {
    AsyncStorage.clear();
}