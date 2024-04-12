import { Text, TouchableOpacity, StyleSheet,Image, View } from 'react-native';

export default function InfoTitle({
    titlel, 
    titles, 
    onPress, 
    money, 
    imageleft, 
    numberleft, 
    styleimageleft, 
    imageright, 
    width, 
    titleright,
    titlerightl,
    titlerights,
    ...prop
}){  
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, {width: width}, {...prop.style}]}>
            <View style = {styles.infoleft}>
                {imageleft ?
                    <Image style = {[styles.imageleft, styleimageleft]} source={imageleft}/>
                    :
                    <View
                        style = {{justifyContent:'center', alignItems:'center', height: 40, width: 40}}
                    >
                        <Text style = {{fontWeight:'bold', fontSize:35}}>{numberleft}</Text>
                    </View>
                }
                <View>
                    <Text
                        style={styles.textl}>
                        {titlel}
                    </Text>
                    {(titles || (typeof (titles) == 'number')) 
                        &&
                        <Text
                            style={styles.texts}>
                            {typeof(titles) == 'number' ? titles.toLocaleString() + ' đ' : titles}
                        </Text>
                    }
                </View>
            </View>

            <View style = {styles.inforight}>
                {(money || (typeof (money) == 'number')) 
                    &&
                    <Text
                        style= {[styles.money, money < 0 ? styles.red : styles.green]}>
                        {typeof(money) == 'number' ? money.toLocaleString() : titles}
                    </Text>
                }
                {titleright 
                    &&
                    <Text
                        style= {[styles.money, styles.red]}>
                        {titleright}
                    </Text>
                }
                {titlerightl 
                    &&
                    <Text
                        style= {[styles.money,{fontSize: 17}]}>
                        {titlerightl.toLocaleString()}
                    </Text>
                }
                {titlerights
                    &&
                    <Text
                        style= {{fontSize:12}}>
                        Còn lại {titlerights.toLocaleString()}
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
    inforight:{
        alignItems:'flex-end'
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