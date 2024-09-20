import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    title: {
      fontSize: 25,
      color: 'black',
      fontWeight: 'bold',
      marginTop: 5,
    },
    card: {
      padding: 20,
      width: '100%',
      height: '100%',
    },
    subtitle: {
      fontSize: 20,
      color: 'black',
    },
    vwimage: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:-40,
    },
    img: {
      backgroundColor: '#f7f3f9',
      width: '60%',
      height: '70%',
      // marginTop: -70,
      // marginBottom: -35,
    },
    btn: {
      borderRadius: 12,
      backgroundColor: '#e74436',
      padding: 10,
      marginBottom: 10,
      marginTop: -15,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.20,
      shadowRadius: 3.8,
      elevation: 5,
    },
    btntxt: {
      color: 'white',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    },
    prgtext: {
      textAlign: 'center',
    }
  });

  export default styles;