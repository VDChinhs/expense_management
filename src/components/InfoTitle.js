import { Text, TouchableOpacity, StyleSheet,Image, View } from 'react-native';

export default function InfoTitle({titlel, titles, onPress, money, imageleft, imageright, width, titleright, ...prop}){  
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, {width: width}, {...prop.style}]}>
            <View style = {styles.infoleft}>
                <Image style = {styles.imageleft} source={imageleft}/>
                <View>
                    <Text
                        style={styles.textl}>
                        {titlel}
                    </Text>
                    {titles 
                        &&
                        <Text
                            style={styles.texts}>
                            {typeof(titles) == 'number' ? titles.toLocaleString() + ' đ' : titles}
                        </Text>
                    }
                </View>
            </View>

            <View style = {styles.inforight}>
                {money 
                    &&
                    <Text
                        style= {[styles.money, money < 0 ? styles.red : styles.green]}>
                        {typeof(money) == 'number' ? money.toLocaleString() + ' đ' : titles}
                    </Text>
                }
                {titleright 
                    &&
                    <Text
                        style= {[styles.money, styles.red]}>
                        {titleright}
                    </Text>
                }
                {imageright 
                    &&
                    <Image
                        style = {styles.imageright}
                        source={imageright}
                    />
                }
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '100%',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor:'red',
        borderBottomColor:'black',
        padding:10,
    },
    infoleft:{
        gap:15,
        flexDirection:'row',
        alignItems:'center'
    },
    imageleft:{
        width:25,
        height:25
    },
    imageright:{
        width:24,
        height:24
    },
    textl: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    texts: {
        fontSize: 12,
    },
    money:{
        fontWeight:'bold',
    },
    red:{
        color: "red",
    },
    green: {
        color: "green",
    },
});