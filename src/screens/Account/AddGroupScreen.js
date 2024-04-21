import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { useState, useEffect, useContext } from "react";
import Button from "../../components/Button";
import { addGroup } from "../../process/GroupController";
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

function TitleInput ({ imagel, imager, sizeimg, titlel, titles, onPress1, onPress2, fontsize }){
    return (
        <View>
            <View style = {{flexDirection:'row', alignItems: 'center', justifyContent:'space-between', paddingRight: 20}}>
                <TouchableOpacity 
                    onPress={onPress1}>
                            <View style = {[styles.containertitle, {gap: 55 - sizeimg}]}>
                                <Image
                                    source={imagel}
                                    style = {{
                                        width: sizeimg,
                                        height: sizeimg,
                                    }}
                                />
                                <View>
                                    {titles && 
                                        <Text style = {{
                                            opacity: titles == 'Nhóm cha' ? 0.4 : 1,
                                            fontSize: 14
                                        }}
                                        >
                                            {titles}
                                        </Text>
                                    }
                                    <Text
                                        style = {{fontSize:fontsize}}
                                    >
                                        {titlel}
                                    </Text>
                                </View>
                            </View>
                </TouchableOpacity>
                {
                    imager &&
                    <TouchableOpacity
                        onPress={onPress2}
                    >
                        <Image
                            source={imager}
                            style = {{
                                width: sizeimg,
                                height: sizeimg,
                            }}
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
}

export default function AddGroupScreen({ navigation, route }) {
    const { userToken, isWalleting } = useContext(AuthContext); 
    
    const [isNameGroup, setNameGroup] = useState('');
    const [isIcon, setIcon] = useState(require('../../assets/question.png'));
    const [isGroupType, setGroupType] = useState('');
    const [isGroupCha, setGroupCha] = useState({name: 'Chọn nhóm'});

    useEffect(() => {
        if (route.params?.type) {
            setGroupType(route.params?.type)
        }
        if (route.params?.icon) {
            setIcon(route.params?.icon)
        }
        if (route.params?.groupcha) {
            setGroupCha(route.params?.groupcha)
        }
    },[route]);

    return(
        <View style = {styles.container}>
            <View style = {styles.inputs}>
                <Input 
                    label ={"Tên nhóm"} 
                    value = {isNameGroup}
                    image = {Number(isIcon)} 
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
                    imagel = {require('../../assets/plus-minus.png')} 
                    titlel ={isGroupType}
                    sizeimg = {25} 
                    fontsize = {20}
                />
                <TitleInput 
                    imagel = {require('../../assets/family-tree.png')} 
                    imager = {require('../../assets/cross.png')} 
                    titles ={'Nhóm cha'}
                    titlel={isGroupCha.name}
                    sizeimg = {25} 
                    fontsize = {20}
                    onPress1={() => navigation.navigate({
                        name:'ChooseGroupCha',
                        params: {back: 'AddGroupScreen' ,group: isGroupCha, khoan: isGroupType, type:'choose'}
                    })}
                    onPress2 = {() => setGroupCha({name: 'Chọn nhóm'})}

                />
            </View>

            <Button
                style={{top:400}}
                title={"Lưu"}
                onPress={async () => {
                        if(await addGroup(
                            userToken, 
                            isNameGroup, 
                            isIcon.image, 
                            isGroupType, 
                            isGroupCha._id,
                            isWalleting._id
                        )){
                            navigation.goBack()
                    }}
                }
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
        width: '200%',
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