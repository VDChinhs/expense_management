import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { useState, useEffect } from "react";
import Button from "../../components/Button";
import HeaderRight from "../../components/HeaderRight";
import { useDispatch } from "react-redux";
import { myWalletChange, myWalletDele } from "../../redux/actions/walletAction";
import { useSelector } from "react-redux";

function Input({ image, sizeimg, fontsize, label, onPressImage, ...prop }) {
    return (
        <View style={[styles.inputcontainer, { gap: 55 - sizeimg }]}>
            <TouchableOpacity onPress={onPressImage}>
                <Image
                    source={image}
                    style={{
                        width: sizeimg,
                        height: sizeimg,
                    }}
                />
            </TouchableOpacity>
            <TextInput
                style={{ fontSize: fontsize, fontWeight: 'bold', width: '90%' }}
                placeholder={label}
                {...prop}
            />
        </View>
    );
}

export default function EditWalletScreen({ navigation, route }) {
    const { userToken } = useSelector(state => state.userReducer)
    const { isChangeing, isDeleting, _myWallet } = useSelector(state => state.walletReducer)

    const [isName, setName] = useState('');
    const [isIcon, setIcon] = useState(null);
    const [isMoney, setMoney] = useState(null);

    const [isWallet, setWallet] = useState(null);

    const dispatch = useDispatch()

    useEffect(() => {
        if (route.params?.icon) {
            setIcon(route.params?.icon)
        }

        if (route.params?.wallet) {
            setIcon(route.params.wallet.image)
            setName(route.params.wallet.name)
            setMoney(route.params.wallet.money)

            setWallet(route.params.wallet)
        }
        navigation.setOptions({
            headerRight: () =>
                <HeaderRight
                    image2={require('../../assets/trash.png')}
                    onPress2={() => {
                        handleDeleWallet(userToken, route.params.wallet._id)
                    }}
                    disabled2={isDeleting}
                />
        });
    }, [route]);

    function handleDeleWallet(userToken, walletid) {
        if (_myWallet.length == 1) {
            Alert.alert('Cảnh báo', 'Chỉ còn 1 ví duy nhất, không thể xóa', [
                { text: 'OK' }
            ]);
            return
        }
        dispatch(myWalletDele({ token: userToken, id: walletid, dispatch: dispatch }))
        navigation.goBack()
    }

    function handleChangeWallet(userToken, isWallet, isName, isIcon) {
        dispatch(myWalletChange({ token: userToken, id: isWallet, name: isName, image: isIcon, dispatch: dispatch }))
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputs}>
                <Input
                    value={isName}
                    image={{ uri: isIcon }}
                    sizeimg={35}
                    fontsize={25}
                    onChangeText={(text) => setName(text)}
                    onPressImage={() =>
                        navigation.navigate({
                            name: 'ChooseIcon',
                            params: { back: 'EditWalletScreen' }
                        })
                    }
                />
                <Input
                    editable={false}
                    image={require('../../assets/coins.png')}
                    sizeimg={30}
                    fontsize={30}
                    keyboardType="number-pad"
                    value={Number(isMoney).toLocaleString()}
                    onChangeText={(money) => {
                        setMoney(money)
                    }}
                />
            </View>
            <Button
                title={"Sửa"}
                onPress={() => {
                    handleChangeWallet(userToken, isWallet._id, isName, isIcon)
                }}
                disabled={isChangeing}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 50,
        height: '100%',
    },
    inputs: {
        width: '100%',
        backgroundColor: 'white',
        marginTop: 20,
    },
    inputcontainer: {
        width: 360,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        padding: 15,
    },
})