import { View, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { useState, useEffect } from "react";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { myAllWallet, myWalletAdd } from "../../redux/actions/walletAction";

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

export default function AddWalletScreen({ navigation, route }) {
    const [isNameGroup, setNameGroup] = useState('');
    const [isIcon, setIcon] = useState(require('../../assets/question.png'));
    const [isMoney, setMoney] = useState(0);
    const { userToken } = useSelector(state => state.userReducer)
    const { isCreating } = useSelector(state => state.walletReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        if (route.params?.icon) {
            setIcon(route.params?.icon)
        }
    });

    function HandleAddWallet(userToken, isNameGroup, isMoney, isIcon) {
        if (userToken == "" || isNameGroup == "" || isMoney == null) {
            Alert.alert('Cảnh báo', 'Vui lòng nhập đầy đủ thông tin', [
                { text: 'OK' }
            ]);
            return
        }
        if (isIcon == require('../../assets/question.png')) {
            Alert.alert('Cảnh báo', 'Vui lòng chọn Icon', [
                { text: 'OK' }
            ]);
            return
        }
        dispatch(myWalletAdd({ token: userToken, name: isNameGroup, money: isMoney, image: isIcon }))
        if (!isCreating) {
            dispatch(myAllWallet(userToken))
            navigation.goBack()
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputs}>
                <Input
                    label={"Tên ví"}
                    image={(typeof isIcon) == 'number' ? Number(isIcon) : { uri: isIcon }}
                    sizeimg={35}
                    fontsize={25}
                    autoFocus={true}
                    onChangeText={(text) => setNameGroup(text)}
                    onPressImage={() =>
                        navigation.navigate({
                            name: 'ChooseIcon',
                            params: { back: 'AddWalletScreen' }
                        })}
                />
                <Input
                    label={"0"}
                    image={require('../../assets/coins.png')}
                    sizeimg={30}
                    fontsize={30}
                    keyboardType="number-pad"
                    onChangeText={(money) => {
                        const rawValue = money.replace(/,/g, '');
                        if (rawValue === '') {
                            setMoney('');
                            return;
                        }
                        if (rawValue === '0') {
                            setMoney('');
                            return;
                        }
                        const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        setMoney(formattedValue)
                    }}
                    value={isMoney}
                />
            </View>
            <Button
                title={"Lưu"}
                onPress={() => {
                    HandleAddWallet(userToken, isNameGroup, parseFloat(String(isMoney).replace(/,/g, '')), isIcon)
                }}
                disabled={isCreating}
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