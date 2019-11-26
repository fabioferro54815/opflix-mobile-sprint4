import React, { Component } from 'react';
import { Text, View, AsyncStorage, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

class Filter extends Component {

    static navigationOptions = {
        tabBarIcon: () => (
          <Image source={require('../../assets/img/57477.png')} style={styles.tabBarNavigatorIcon} />
        ),
      }
      
    constructor() {
        super();
        this.state = {
            lancamentos: [],
            categoriaBuscada: '',
        };
    }

    _listarLancamentos = async () => {
        await fetch('http://192.168.4.195:5000/Api/Categorias/BuscarPorNome/' + this.state.categoriaBuscada, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + await AsyncStorage.getItem("@opflix:token")
            },
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ lancamentos : data }))
            .catch(erro => console.warn(erro));
    };

    render() {
        return (
            <View style={styles.tudo}>
              <View style={styles.titulo}>
                <Text style={styles.h1}>Filtro</Text>
              </View>
              <View style={styles.pesquisa}>
                <TextInput onChangeText={categoriaBuscada => this.setState({ categoriaBuscada })}
                    value={this.state.categoriaBuscada} style={styles.input}></TextInput>
                <TouchableOpacity onPress={this._listarLancamentos}>
                    <Image source={require('../../assets/img/lupa.png')} style={styles.lupa}></Image>
                </TouchableOpacity>
              </View>
                <FlatList style={styles.lista}
                    data={this.state.lancamentos.lancamentos}
                    keyExtractor={item => item.idLancamento}
                    renderItem={({ item }) => (
                        <View style={styles.caixa}>
                            <Text style={styles.textos}>{item.titulo}</Text>
                            <Text style={styles.textos}>{item.sinopse}</Text>
                            <Text style={styles.textos}>{item.tempoDuracao}</Text>
                            <Text style={styles.textos}>{item.dataLancamento}</Text>
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
    h1:{
      fontSize: 40,
      textAlign: "center",
      borderBottomColor: 'red',
      borderBottomWidth: 4,
      color: '#fff',
      backgroundColor: '#202020',
      fontWeight: 'bold'

    },
    lista: {
      height:'72%',
      backgroundColor: '#202020'
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
      color: 'white'
    },
      tabBarNavigatorIcon: {
        width: 25,
        height: 25,
      },
      input: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 100,
        width: '80%'
      },
      pesquisa: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        margin: 10
      },
      lupa: {
        width: 50,
        height: 50
      }
  });
export default Filter;