import React, { Component} from 'react';
import { Text, View, AsyncStorage,TouchableOpacity , StyleSheet , Image} from 'react-native';
import JwtDecode from 'jwt-decode';

class Profile extends Component{

    static navigationOptions = {
        tabBarIcon: () => (
          <Image source={require('../../assets/img/121693.png')} style={styles.tabBarNavigatorIcon} />
        ),
      }

    constructor() {
        super();
        this.state = {
            nome: '',
            email: '',
            imagem: '',
        };
    }

    componentDidMount() {
        this._buscarNoStorage();
      }

    _buscarNoStorage = async() => {
       this.setState({nome: JwtDecode(await AsyncStorage.getItem('@opflix:token')).Nome});
       this.setState({email: JwtDecode(await AsyncStorage.getItem('@opflix:token')).Email});
       this.setState({imagem: JwtDecode(await AsyncStorage.getItem('@opflix:token')).Imagem});
    }

    _delogar = async() => {
        AsyncStorage.clear();
        this.props.navigation.navigate('AuthStack');
    }

    render() {
        return (
            <View style={styles.tudo}>
              <View style={styles.titulo}>
                <Text style={styles.h1}>Perfil</Text>
              </View>
              <View  style={styles.conteudo}>
                <Image source={{uri: 'http://192.168.4.195:5000'+this.state.imagem}} style={styles.imgperfil}></Image>
                <View style={styles.infos}>
                  <Text style={styles.textos}>{this.state.nome}</Text>
                  <Text style={styles.textos}>{this.state.email}</Text>
                </View>
                <TouchableOpacity style={styles.btn} onPress={this._delogar}>
                    <Text style={styles.textobtn}>Sair da Conta</Text>
                </TouchableOpacity>
              </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    tudo:{
      backgroundColor: '#202020',
      height: '100%'
    },
    h1:{
      fontSize: 40,
      textAlign: "center",
      borderBottomColor: 'red',
      borderBottomWidth: 4,
      color: '#fff',
      backgroundColor: '#202020',
      fontWeight: 'bold'
    },
    titulo: {
      width: '60%',
      alignSelf: 'center',
      margin: 20
    },
    caixa: {
      backgroundColor: '#161616',
      width: '95%',
      borderColor: '#000',
      borderWidth: 2.5,
      margin: 5,
      alignSelf: 'center',
      color: 'white',
      padding: 5
    },
    textos: {
      color: 'white',
      fontSize: 30,
      alignSelf: 'center',
      margin: 10,
      
    },
      tabBarNavigatorIcon: {
        width: 25,
        height: 25,
      },
      btn: {
        backgroundColor: 'red',
        width: 200,
        height: 50,
        borderRadius: 100,
        textAlign: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 60        
      },
      textobtn: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold'
      },
      imgperfil: {
        width: 200,
        height: 200,
        borderColor: '#707070',
        borderWidth: 2,
        borderRadius: 100,
        alignSelf: 'center'
      },
      infos: {
        marginTop: 20
      }
  });
export default Profile;