import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    systemName: {
       fontSize: 30,
       textAlign:'center',
       fontWeight:'bold',
       marginTop:15,

    },
    title: {

    },
    logo: {
        flex: 1,
       height: 90,
        width: 90,

        // resizeMode: 'stretch',
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    },
    error:{
        color:"#FF0000",
        marginLeft:31,
        marginRight:31,
    }
    // searchSection: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#fff',
    // },
    // searchIcon: {
    //     padding: 10,
    // },

    // input: {
    //     flex: 1,
    //     paddingTop: 10,
    //     paddingRight: 10,
    //     paddingBottom: 10,
    //     paddingLeft: 0,
    //     backgroundColor: '#fff',
    //     color: '#424242',
    // },
})