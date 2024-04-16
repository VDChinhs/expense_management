import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions } from "react-native";
import { useState, useContext, useEffect } from "react";

export default function ChooseIcon({ navigation, route }) {
    const { width } = Dimensions.get('screen')
    const cols = 5
    const gapicon = (width - ((cols * 50) + 40)) / (cols - 1)

    const data = [
        {id:0, image: require('../../assets/a.png')},
        {id:1, image: require('../../assets/add.png')},
        {id:2, image: require('../../assets/align-left.png')},
        {id:3, image: require('../../assets/angle-small-right.png')},
        {id:4, image: require('../../assets/anuong.png')},
        {id:5, image: require('../../assets/bell.png')},
        {id:6, image: require('../../assets/book-open-cover.png')},
        {id:7, image: require('../../assets/box-open-full.png')},
        {id:8, image: require('../../assets/budget-alt.png')},
        {id:9, image: require('../../assets/question.png')},
        {id:10, image: require('../../assets/calendar-day.png')},
        {id:11, image: require('../../assets/check-mark.png')},
        {id:12, image: require('../../assets/coins.png')},
        {id:13, image: require('../../assets/delete-user.png')},
        {id:14, image: require('../../assets/eye-crossed.png')},
        {id:15, image: require('../../assets/eye.png')},
        {id:16, image: require('../../assets/family-tree.png')},
        {id:17, image: require('../../assets/giaitri.png')},
        {id:18, image: require('../../assets/giaoduc.png')},
        {id:19, image: require('../../assets/home.png')},
        {id:20, image: require('../../assets/logo.png')}, 
        {id:21, image: require('../../assets/man.png')}, 
        {id:22, image: require('../../assets/menu-dots-vertical.png')}, 
        {id:23, image: require('../../assets/plus-minus.png')}, 
        {id:24, image: require('../../assets/plus-small.png')}, 
        {id:25, image: require('../../assets/quatang.png')}, 
        {id:26, image: require('../../assets/question.png')}, 
        {id:27, image: require('../../assets/replace.png')}, 
        {id:28, image: require('../../assets/search.png')}, 
        {id:29, image: require('../../assets/settings.png')}, 
        {id:30, image: require('../../assets/suckhoe.png')}, 
        {id:31, image: require('../../assets/themnhom.png')}, 
        {id:32, image: require('../../assets/thoitrang.png')}, 
        {id:33, image: require('../../assets/thucung.png')}, 
        {id:34, image: require('../../assets/tiendien.png')}, 
        {id:35, image: require('../../assets/tienmang.png')}, 
        {id:36, image: require('../../assets/tiennuoc.png')}, 
        {id:37, image: require('../../assets/trash.png')}, 
        {id:38, image: require('../../assets/user-headset.png')}, 
        {id:39, image: require('../../assets/user.png')}, 
        {id:40, image: require('../../assets/wallet.png')}, 
        {id:41, image: require('../../assets/dulich.png')}, 
        {id:42, image: require('../../assets/dulich.png')}, 
        {id:43, image: require('../../assets/dulich.png')}, 
        {id:44, image: require('../../assets/dulich.png')}, 
        {id:45, image: require('../../assets/dulich.png')}, 
        {id:46, image: require('../../assets/dulich.png')}, 
        {id:47, image: require('../../assets/dulich.png')}, 
        {id:48, image: require('../../assets/dulich.png')}, 
        {id:49, image: require('../../assets/dulich.png')},
        {id:50, image: require('../../assets/dulich.png')}, 
        {id:51, image: require('../../assets/dulich.png')}, 
        {id:52, image: require('../../assets/dulich.png')}, 
        {id:53, image: require('../../assets/dulich.png')}, 
        {id:54, image: require('../../assets/dulich.png')}, 
        {id:55, image: require('../../assets/dulich.png')}, 
        {id:56, image: require('../../assets/dulich.png')}, 
        {id:57, image: require('../../assets/dulich.png')}, 
        {id:58, image: require('../../assets/dulich.png')}, 
        {id:59, image: require('../../assets/dulich.png')},  
    ]
    const [isBack, SetBack] = useState('');

    useEffect(() => {
        if (route.params?.back) {
            SetBack(route.params?.back)
        }
    });

    return(
        <View style = {styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                numColumns={cols}
                columnWrapperStyle = {{gap: gapicon}}
                contentContainerStyle ={{gap: 20, paddingHorizontal: 20}}
                showsVerticalScrollIndicator= {false}
                renderItem={({item}) => {
                    return(
                        <TouchableOpacity
                            onPress={() =>navigation.navigate(isBack, {icon: item})
                                }
                        >
                            <Image
                                source={item.image}
                                style = {styles.image}
                            />
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginVertical:20
    }, 
    image:{
        width: 50,
        height: 50,
        backgroundColor:'#C0C0C0',
        borderRadius: 10
    }
})