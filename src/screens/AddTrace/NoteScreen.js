import * as React from 'react';
import { Text, TextInput, View, StyleSheet} from 'react-native';
import Button from '../../components/Button';

export default function CreatePostScreen({ navigation, route }) {
    const [postText, setPostText] = React.useState('');

    React.useEffect(() => {
        if (route.params?.note) {
            setPostText(route.params?.note)

        }
      }, [route.params?.post]);
  
    return (
        <View style = {styles.container}>
            <View style = {{width:360}}>
                <TextInput
                multiline
                autoFocus={true}
                style={styles.input}
                value={postText}
                onChangeText={setPostText}
                />
            </View>
            <Button
                title={"Lưu"}
                onPress={() => {
                    navigation.navigate('AddTrade', {note: postText});
                }}
            />   
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
    },
    input: {
        fontSize: 17,
        padding: 20,
        fontWeight: 'bold',
        marginBottom: 40,
      },
})