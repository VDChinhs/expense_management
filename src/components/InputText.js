import { TextInput, StyleSheet } from 'react-native';

export default function InputText({ label, ...prop }) {

  return (
      <TextInput
        style={styles.input}
        placeholder={label}
        // onBlur={() => console.log('1')}
        {...prop}
      />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    width: 330,
    height: 60,
    fontSize: 15,
    padding: 20,
    fontWeight: 'bold',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'black',
    marginBottom: 15
  },
});
