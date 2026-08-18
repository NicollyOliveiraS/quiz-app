import { StyleSheet, Text, View, Button } from 'react-native';


export default function App() {
    let contadorNormal = 0;
    function incrementarContadorNormal(){
        contadorNormal = contadorNormal + 1;
        console.warn('Valor do contador normal:', contadorNormal);

    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Exemplo de UseState</Text>

            <Text style={styles.valueText}>Contador Normal: {contadorNormal}</Text>

            <Button
            title="Incrementar Variável Normal"
            onPress={incrementarContadorNormal}
            />
            <Text style={styles.subTitle}>O que está acontecendo?</Text>
            <Text style={styles.explanation}>
            Ao clicar no botão, a variável `contadorNormal` realmente aumenta. Você pode ver isso no console.
        No entanto, o componente não sabe que a variável mudou, então ele não re-renderiza.
        O valor na tela permanece 0, mostrando que variáveis normais não causam atualizações na UI.
            </Text>
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    valueText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#007AFF',
        marginVertical: 10,
        textAlign: 'center',
    },
     explanation: {
    textAlign: 'center',
    marginTop: 10,
    color: '#555',
  },
    });