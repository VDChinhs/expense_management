import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import Button from "../../components/Button";

function Input({ image, sizeimg, fontsize, label, ...prop }) {
    return (
      <View style = {[styles.inputcontainer, {gap: 55 - sizeimg}]}>
        <Image
          source={image}
          style = {{
            width: sizeimg,
            height: sizeimg,
          }}
        />
        <TextInput
          style={{fontSize: fontsize, fontWeight:'bold',width:'90%'}}
          placeholder={label}
          {...prop}
          
        />
      </View>
    );
}

function TitleInput ({ image, sizeimg, fontsize, title, onPress}){
    return (
        <TouchableOpacity 
          style = {[styles.containertitle, {gap: 55 - sizeimg}]} 
          onPress={onPress}>
            <Image
              source={image}
              style = {{
                width: sizeimg,
                height: sizeimg,
              }}
            />
            <Text style = {{
                fontSize: fontsize,
                fontWeight: 'bold',
                opacity: title == 'Nhóm cha' || title == 'Biểu tượng' ? 0.4 : 1
              }}
            >
              {title}
            </Text>
        </TouchableOpacity>
    );
}

function HandlerSave(name, icon, groupcha) {
    data = {
        name: name,
        icon: icon,
        groupcha: groupcha
    }
    console.log(data);
}

export default function AddGroupScreen() {
    const [isNameGroup, setNameGroup] = useState('');
    const [isIcon, setIcon] = useState('');
    const [isGroupCha, setGroupCha] = useState('');
    const [isImageIcon, setImageIcon] = useState(require('../../assets/question.png'));
    const [isImageGroup, setImageGroup] = useState(require('../../assets/question.png'));

    return(
        <View style = {styles.container}>
            <View style = {styles.inputs}>
                <Input 
                    label ={"Tên nhóm"} 
                    image = {require('../../assets/a.png')} 
                    sizeimg = {25} 
                    fontsize = {30} 
                    autoFocus = {true}
                    onChangeText = {(text) => setNameGroup(text)}
                />
                <TitleInput 
                    image = {isImageIcon} 
                    title ={'Biểu tượng'}
                    sizeimg = {30} 
                    fontsize = {20}
                />
                <TitleInput 
                    image = {isImageGroup} 
                    title ={'Nhóm cha'}
                    sizeimg = {30} 
                    fontsize = {20}
                />
            </View>
            <Button
                style={{top:400}}
                title={"Lưu"}
                onPress={() => HandlerSave(isNameGroup, isIcon, isGroupCha)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        height:'100%',
        // gap:100,
    },
    inputs:{
        width:'100%',
        backgroundColor:'white',
        gap:-15,
        marginTop: 20,
    },
    containertitle:{
        flexDirection:'row',
        paddingLeft: 15,
        padding: 15,
        alignItems:'center',
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