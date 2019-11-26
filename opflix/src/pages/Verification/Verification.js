import React, { Component } from 'react';
import { View, StyleSheet , AsyncStorage, Image, Dimensions } from 'react-native';

class Verication extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor() {
        super();
        this.state = {
            email: '',
            senha: '',
        };
    }

    componentDidMount() {
        this._loginAuto();
    }

    _loginAuto = async () => {
        this.setState({ email: await AsyncStorage.getItem('@opflix:email') })
        this.setState({ senha: await AsyncStorage.getItem('@opflix:senha') })
        await fetch('http://192.168.4.195:5000/Api/Login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                senha: this.state.senha,
            }),
        })
            .then(resposta => resposta.json())
            .then(data => this._checarToken(data.token))
            .catch(erro => console.warn(erro));
    };

    _checarToken = async tokenRecebido => {
        if (tokenRecebido != null) {
            await AsyncStorage.setItem('@opflix:token', tokenRecebido);
            this.props.navigation.navigate('MainNavigator');
        } else {
            this.props.navigation.navigate('AuthStack');
        }

    };

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../assets/img/Logo.png')} style={styles.img}></Image>
            </View>
        )
    }
}

let ScreenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#202020',
      alignItems: 'center',
      height: ScreenHeight,
      justifyContent: 'center',
    },
    img: {
        width: 300,
        height: 100
      }
});
export default Verication;