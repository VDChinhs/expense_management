import { View, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions } from "react-native";
import { useState, useEffect } from "react";

export default function ChooseIcon({ navigation, route }) {
    const { width } = Dimensions.get('screen')
    const cols = 5
    const gapicon = (width - ((cols * 50) + 40)) / (cols - 1)

    const data = [
        {id:0, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F1.png?alt=media&token=18e256ee-73cf-4be8-8e8f-a2d10ba0f350'},
        {id:1, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F10.png?alt=media&token=ec7558c1-ed1f-4ec4-b27a-21db350c0339'},
        {id:2, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F11.png?alt=media&token=d0e36bc7-86c4-4cb2-ad86-0a1c213f335f'},
        {id:3, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F12.png?alt=media&token=42942e4a-02b1-484f-af72-c2d775f154c1'},
        {id:4, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F13.png?alt=media&token=f560dac7-62d4-47c6-acdf-95fdf9de2c97'},
        {id:5, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F14.png?alt=media&token=c94b461b-55da-4785-a4c6-ef2e519b0f13'},
        {id:6, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F15.png?alt=media&token=a7d2e6cf-c2c2-4601-9e5e-f64f662adb5c'},
        {id:7, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F16.png?alt=media&token=0ca50195-e2a6-4b3e-8a66-9b5151aa694c'},
        {id:8, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F17.png?alt=media&token=3fb17696-5c61-482d-bc4c-4fa44b9bd526'},
        {id:9, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F18.png?alt=media&token=ca160749-4bab-4b71-8b92-b9019058baee'},
        {id:10, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F19.png?alt=media&token=561e7f30-8b76-417b-ba25-929797737401'},
        {id:11, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F2.png?alt=media&token=84e6b6fe-0e8c-4c90-9c0b-027aa0ccbf61'},
        {id:12, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F20.png?alt=media&token=103c9561-ed52-42fa-b8af-b7919f91c5ba'},
        {id:13, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F21.png?alt=media&token=aa745ea0-1f00-4558-9238-a7517a45a652'},
        {id:14, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F22.png?alt=media&token=0eace963-58e5-47fd-8497-7f419a10625c'},
        {id:15, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F23.png?alt=media&token=8e176ea7-3a37-45f1-b83f-47ee0130a9d1'},
        {id:16, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F24.png?alt=media&token=ea107f77-af34-4962-8d40-a23434829af4'},
        {id:17, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F25.png?alt=media&token=e2159eb2-b9f6-446f-9dd8-00d935c1e72b'},
        {id:18, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F26.png?alt=media&token=f6022e6c-2ca4-421e-9961-e1aed5256494'},
        {id:19, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F27.png?alt=media&token=f40171b7-bbcf-48b2-bc32-facaa3995dab'},
        {id:20, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F28.png?alt=media&token=0214955d-638a-47be-aa18-165a6a3af957'}, 
        {id:21, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F29.png?alt=media&token=6c3c4524-f454-4c41-b7c3-2a4239615122'}, 
        {id:22, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F3.png?alt=media&token=24907ad1-7055-473f-b5bf-aae696015e1e'}, 
        {id:23, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F30.png?alt=media&token=380e2566-3e91-4362-9ee3-086c162491a1'}, 
        {id:24, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F31.png?alt=media&token=4deedb08-3a2b-43cd-abb7-71c902b7e4bb'}, 
        {id:25, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F32.png?alt=media&token=6895f229-014c-4eb2-82bd-6c15c1535e17'}, 
        {id:26, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F33.png?alt=media&token=5d902996-d2dc-4868-84d9-09409e808300'}, 
        {id:27, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F34.png?alt=media&token=3994af42-12d8-41df-af81-502695274418'}, 
        {id:28, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F35.png?alt=media&token=1b504de4-e9b0-4ed8-9fbe-78b20b0faf32'}, 
        {id:29, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F36.png?alt=media&token=61a115e3-1777-4316-a68e-2043ef2349fa'}, 
        {id:30, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F37.png?alt=media&token=e2bba860-92d6-4381-ba11-60c683b277a1'}, 
        {id:31, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F38.png?alt=media&token=f062663f-8254-4e61-aabb-b983c3ffc85e'}, 
        {id:32, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F39.png?alt=media&token=9fb9682f-8f13-4d7f-9eaf-dab1adbe14e6'}, 
        {id:33, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F4.png?alt=media&token=08725d51-2c7c-4f31-baa9-8f06b275d4b8'}, 
        {id:34, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F40.png?alt=media&token=70ccb989-558b-4999-9772-ab5d8b5df2f5'}, 
        {id:35, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F41.png?alt=media&token=a59741dd-bac0-444f-8e54-339a814124f5'}, 
        {id:36, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F42.png?alt=media&token=29bf4889-81ac-4bb6-a865-2f56edcdd4db'}, 
        {id:37, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F43.png?alt=media&token=5dcd3b69-4763-404f-bf4c-81a38f765fc6'}, 
        {id:38, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F44.png?alt=media&token=a786c6ee-0560-4a47-9581-c6f2508ea6c1'}, 
        {id:39, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F45.png?alt=media&token=dbc4efff-2d01-4570-aa54-be1e64f5bc92'}, 
        {id:40, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F46.png?alt=media&token=14877208-2837-4a29-98d6-f0826d227885'}, 
        {id:41, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F47.png?alt=media&token=b8a635c2-4963-46f7-8be4-138d83ad583d'}, 
        {id:42, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F48.png?alt=media&token=d16d0cab-f118-4b65-b774-718c2c43ecbb'}, 
        {id:43, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F49.png?alt=media&token=0c762736-ae40-4edf-a483-13deb32ac009'}, 
        {id:44, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F5.png?alt=media&token=252b3930-c82b-458e-a432-8504cd1cf2d9'}, 
        {id:45, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F50.png?alt=media&token=b47c3b39-6258-43a1-b713-e463c3b0f4e3'}, 
        {id:46, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F51.png?alt=media&token=1682f2d1-dbe2-4217-9d71-b6d168e3f659'}, 
        {id:47, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F6.png?alt=media&token=11091ccb-c81d-4959-9d73-85d97295ac35'}, 
        {id:48, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F7.png?alt=media&token=8fdbf8ad-6104-4d1b-9c66-29edcb41de2c'}, 
        {id:49, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F8.png?alt=media&token=c703fd4f-20e7-461f-8793-9cf30aca24db'},
        {id:50, image: 'https://firebasestorage.googleapis.com/v0/b/moneysaver-acdd1.appspot.com/o/icons%2F9.png?alt=media&token=3ed9bb39-f015-4daa-9f27-5c713d03b6c0'}, 
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
                            onPress={() =>navigation.navigate(isBack, {icon: item.image})
                                }
                        >
                            <Image
                                source={{uri: item.image}}
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
        // backgroundColor:'#C0C0C0',
        borderRadius: 10
    }
})