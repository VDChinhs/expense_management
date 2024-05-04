import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setTokenStorage(value) {
    try {
        await AsyncStorage.setItem('userToken', value);
    } catch (e) {
        console.log("Lỗi setTokenStorage: " + error)
    }
};

export async function getTokenStorage() {
    try {
        let userToken = await AsyncStorage.getItem('userToken');
        return userToken
    } catch (error) {
        console.log("Lỗi getTokenStorage: " + error)
    }
};

export function removeTokenStorage() {
    try {
        AsyncStorage.removeItem('userToken')
    } catch (error) {
        console.log("Lỗi removeTokenStorage: " + error)
    }
};