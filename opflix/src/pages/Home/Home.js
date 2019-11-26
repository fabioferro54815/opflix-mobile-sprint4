import React, { Component } from 'react';
import {Text, View, AsyncStorage, StyleSheet, Image } from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

class Home extends Component {

  static navigationOptions = {
    tabBarIcon: () => (
      <Image source={require('../../assets/img/16543.png')} style={styles.tabBarNavigatorIcon} />
    ),
  }

    constructor() {
        super();
        this.state = {
          lancamentos: [],
        };
      }

      componentDidMount() {
        this._listarLancamentos();
      }

      _listarLancamentos = async () => {
        await fetch('http://192.168.4.195:5000/Api/Lancamentos', {
            headers:{
                "Accept": "application/json",
                "Authorization": "Bearer " + await AsyncStorage.getItem("@opflix:token")
            },
        })
          .then(resposta => resposta.json())
          .then(data => this.setState({lancamentos: data}))
          .catch(erro => console.warn(erro));
      };

    render() {
        return (
            <View style={styles.tudo}>
              <View style={styles.titulo}>
                <Text style={styles.h1}>Lançamentos</Text>
              </View>
                <FlatList 
                style={styles.lista}
                data={this.state.lancamentos}
                keyExtractor={item => item.idLancamento}
                renderItem={({item}) => (
                    <View style={styles.caixa}>
                      <Text style={styles.textos}>Titulo: {item.titulo}</Text>
                      <Text style={styles.textos}>Sinopse: {item.sinopse}</Text>
                      <Text style={styles.textos}>Categoria: {item.idCategoriaNavigation.nome}</Text>
                      <Text style={styles.textos}>Duração: {item.tempoDuracao}</Text>
                      <Text style={styles.textos}>Data de Lançamento: {item.dataLancamento}</Text>
                    </View>
                )}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
  tudo:{
    backgroundColor: '#202020',
  },
  lista:{
    height:'84.5%',
    backgroundColor: '#202020'
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
    margin: 10,
    alignSelf: 'center',
    color: 'white',
    padding: 5
  },
  textos: {
    color: 'white'
  },
    tabBarNavigatorIcon: {
      width: 25,
      height: 25,
    }
});
export default Home;