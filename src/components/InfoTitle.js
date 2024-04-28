import { Text, TouchableOpacity, StyleSheet,Image, View } from 'react-native';

export default function InfoTitle({
    titlel, 
    titles, 
    onPress, 
    money, 
    imageleft,
    imageleftsmall,
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
                    <View>
                        <Image style = {[styles.imageleft, styleimageleft]} source={imageleft}/>
                        {
                            imageleftsmall &&
                            <View style = {styles.containerimageleftsmall}
                            >
                                <Image style = {styles.imageleftsmall} source={imageleftsmall}/>
                            </View>
                        }
                    </View>
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
        width:30,
        height:30
    },
    imageleftsmall:{
        width:15,
        height:15
    },
    containerimageleftsmall:{
        width: 17,
        height: 17,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        borderRadius: 10,     
        position:'absolute',
        bottom: -7,
        right: -7,
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