import { Text, View, StyleSheet, TextInput,Image } from "react-native";
import Button from "../../components/Button";
import InputText from "../../components/InputText";

export default function AddScreen() {

  function Input({ image, sizeimg, fontsize, label, ...prop }) {
    return (
      <View style = {[styles.inputcontainer, {gap: 55- sizeimg}]}>
        <Image
          source={image}
          style = {{
            width: sizeimg,
            height: sizeimg,
          }}
        />
        <TextInput
          style={[styles.input, {fontSize: fontsize}]}
          placeholder={label}
          {...prop}
        />
      </View>
  );
  }

  return (
    <View style = {styles.container}>
      <View style = {styles.inputs}>
        <Input image={require('../../assets/coins.png')} sizeimg={30} label={"10,000,000"} fontsize={30}></Input>
        <Input image={require('../../assets/wallet.png')} sizeimg={30} label={"Chọn nhóm"} fontsize={20}></Input>
        <Input image={require('../../assets/align-left.png')} sizeimg={20} label={"Ghi chú"} fontsize={15}></Input>
        <Input image={require('../../assets/calendar-day.png')} sizeimg={20} label={"Hôm nay"} fontsize={15}></Input>
        <Input image={require('../../assets/wallet.png')} sizeimg={20} label={"Học tập"} fontsize={15}></Input>
      </View>
      <Button title={"Lưu"}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        gap:350
    },
    inputs:{
      borderRadius:25,
      backgroundColor:'#BFBEBE',
      gap:-15,
      marginTop: 20,
    },
    inputcontainer:{
      width:360,
      justifyContent:'flex-start',
      flexDirection:'row',
      paddingLeft: 15,
      padding:15,
    },
    input: {
      width:270,
      fontWeight: 'bold',
    },
})