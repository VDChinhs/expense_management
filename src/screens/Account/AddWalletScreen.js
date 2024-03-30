import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";
import Button from "../../components/Button";

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

function HandlerSave(name, icon, money) {
    data = {
        name: name,
        icon: icon,
        money: money
    }
    console.log(data);
}

export default function AddWalletScreen({ navigation, route }) {
    const [isNameGroup, setNameGroup] = useState('');
    const [isIcon, setIcon] = useState(require('../../assets/question.png'));
    const [isMoney, setMoney] = useState(null);
 
    useEffect(() => {
        if (route.params?.imagegroup) {
            setIcon(route.params?.imagegroup)
        }
    });

    return(
        <View style = {styles.container}>
            <View style = {styles.inputs}>
                <Input 
                    label ={"Tên ví"} 
                    image = {isIcon} 
                    sizeimg = {35} 
                    fontsize = {25} 
                    autoFocus = {true}
                    onChangeText = {(text) => setNameGroup(text)}
                    onPressImage={() => 
                      navigation.navigate({
                        name: 'ChooseIcon',
                        params: {back: 'AddWalletScreen'}
                      })}
                />
                <Input 
                    label ={"0"} 
                    image = {require('../../assets/coins.png')} 
                    sizeimg = {30} 
                    fontsize = {30} 
                    keyboardType = "number-pad"
                    onChangeText = {(money) => {
                        setMoney(parseFloat(money.replace(/,/g, '')))
                    }}
                    value = {isMoney && isMoney.toLocaleString()}
                />
            </View>
            <Button
                style={{top:400}}
                title={"Lưu"}
                onPress={() => HandlerSave(isNameGroup, isIcon, isMoney)}
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