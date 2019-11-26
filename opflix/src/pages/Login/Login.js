import React, {Component} from 'react';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';

class Login extends Component {
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

  _fazerLogin = async () => {
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
      .then(await AsyncStorage.setItem('@opflix:email', this.state.email))
      .then(await AsyncStorage.setItem('@opflix:senha', this.state.senha))
      .then(data => this._redirecionarHome(data.token))
      .catch(erro => console.warn(erro));
  };

  _redirecionarHome = async tokenRecebido => {
    if (tokenRecebido != null) {
      try {
          console.warn(tokenRecebido)
        await AsyncStorage.setItem('@opflix:token', tokenRecebido);
        this.props.navigation.navigate('MainNavigator');
      } catch (error) {
          console.warn(erro)
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/img/Logo.png')} style={styles.img}></Image>
        <View >
          <TextInput style={styles.input}
            placeholder="Email:" placeholderTextColor="white"
            onChangeText={email => this.setState({email})}
            value={this.state.email}
            />
          <TextInput style={styles.input}
            placeholder="Senha:" placeholderTextColor="white"
            onChangeText={senha => this.setState({senha})}
            value={this.state.senha}
            />
        </View>
        <TouchableOpacity style={styles.btn} onPress={this._fazerLogin}>
          <Text style={styles.textobtn}>Entrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

let ScreenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#202020',
    alignItems: 'center',
    height: ScreenHeight,
    justifyContent: 'space-evenly',
  },
  input: {
      color: 'white',
      borderBottomColor: '#bbb',
      borderBottomWidth: 1,
      width: 280,
      fontSize: 22
  },
  btn: {
        backgroundColor: 'red',
        width: 250,
        height: 50,
        borderRadius: 100,
        textAlign: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
  },
  textobtn: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold'
  },
  botao: {
    justifyContent: 'center',
  },
  img: {
    width: 300,
    height: 100
  }
});

export default Login;