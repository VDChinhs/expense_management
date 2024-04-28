import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { useState, useEffect, useContext } from "react";
import Button from "../../components/Button";
import HeaderRight from "../../components/HeaderRight";
import { changeWallet, deleWallet } from "../../process/WalletController";
import { AuthContext } from "../../context/AuthContext";

function Input({ image, sizeimg, fontsize, label, onPressImage, ...prop }) {
    return (
      <View style = {[styles.inputcontainer, {gap: 55 - sizeimg}]}>
        <TouchableOpacity onPress={onPressImage}>
          <Image
            source={image}
            style = {{
              width: sizeimg,
              height: sizeimg,
            }}
          />
        </TouchableOpacity>
        <TextInput
          style={{fontSize: fontsize, fontWeight:'bold',width:'90%'}}
          placeholder={label}
          {...prop}
        />
      </View>
    );
}

export default function EditWalletScreen({ navigation, route }) {
    const {userToken} = useContext(AuthContext);

    const [isName, setName] = useState('');
    const [isIcon, setIcon] = useState(null);
    const [isMoney, setMoney] = useState(null);

    const [isWallet, setWallet] = useState(null);

 
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
                    onPress2={async () => {
                        if(await deleWallet(userToken, isWallet._id)){
                            navigation.goBack()
                        }
                    }}
                />  
        });
    },[route]);

    return(
        <View style = {styles.container}>
            <View style = {styles.inputs}>
                <Input 
                    value = {isName}
                    image = {{uri: isIcon}} 
                    sizeimg = {35} 
                    fontsize = {25} 
                    autoFocus = {true}
                    onChangeText = {(text) => setName(text)}
                    onPressImage={() => 
                      navigation.navigate({
                        name: 'ChooseIcon',
                        params: {back: 'EditWalletScreen'}
                      })}
                />
                <Input 
                    editable = {false}
                    image = {require('../../assets/coins.png')} 
                    sizeimg = {30} 
                    fontsize = {30} 
                    keyboardType = "number-pad"
                    onChangeText = {(money) => {
                        // setMoney(parseFloat(money.replace(/,/g, '')))
                        setMoney(money)
                    }}
                    value = {isMoney && isMoney.toLocaleString()}
                />
            </View>
            <Button
                style={{top:400}}
                title={"Sửa"}
                onPress={async () => {
                    if(await changeWallet(userToken, isWallet._id, isName, isIcon)){
                        navigation.goBack()
                    }
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        height:'100%',
    },
    inputs:{
        width:'100%',
        backgroundColor:'white',
        marginTop: 20,
    },
    inputcontainer:{
        width:360,
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        paddingLeft: 15,
        padding:15,
    },
})