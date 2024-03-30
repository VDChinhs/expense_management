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

function TitleInput ({ image, sizeimg, titlel, titles, onPress, fontsize }){
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
            <View>
              {titles && <Text style = {{
                  opacity: titles == 'Nhóm cha' ? 0.4 : 1,
                  fontSize:14
                }}
              >
                {titles}
              </Text>}
              <Text
                style = {{fontSize:fontsize}}
              >
                {titlel}
              </Text>
            </View>
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

export default function AddGroupScreen({ navigation, route }) {
    const [isNameGroup, setNameGroup] = useState('');
    const [isIcon, setIcon] = useState(require('../../assets/question.png'));
    const [isGroupType, setGroupType] = useState('');
    const [isGroupCha, setGroupCha] = useState('Chọn nhóm');

    useEffect(() => {
        if (route.params?.type) {
            setGroupType(route.params?.type)
        }
        if (route.params?.namegroup) {
            setGroupCha(route.params?.namegroup)
        }
        if (route.params?.imagegroup) {
            setIcon(route.params?.imagegroup)
        }
    });

    return(
        <View style = {styles.container}>
            <View style = {styles.inputs}>
                <Input 
                    label ={"Tên nhóm"} 
                    image = {isIcon} 
                    sizeimg = {35} 
                    fontsize = {25} 
                    autoFocus = {true}
                    onChangeText = {(text) => setNameGroup(text)}
                    onPressImage={() => 
                      navigation.navigate({
                        name: 'ChooseIcon',
                        params: {back: 'AddGroupScreen'}
                      })}
                />
                <TitleInput 
                    image = {require('../../assets/plus-minus.png')} 
                    titlel ={isGroupType}
                    sizeimg = {25} 
                    fontsize = {20}
                />
                <TitleInput 
                    image = {require('../../assets/family-tree.png')} 
                    titles ={'Nhóm cha'}
                    titlel={isGroupCha}
                    sizeimg = {25} 
                    fontsize = {20}
                    onPress={() => navigation.navigate({
                        name:'ChooseGroupCha',
                        params: {group: isGroupCha, khoan: isGroupType, type:'choose'}
                    })}
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
    },
    inputs:{
        width:'100%',
        backgroundColor:'white',
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