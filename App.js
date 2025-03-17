import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function App() {
  const [milisegundos, setMilisegundos] = useState(0);
  const [rodando, setRodando] = useState(false);

  useEffect(() => {
    let timer = null;
    if (rodando) {
      timer = setInterval(() => {
        setMilisegundos((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [rodando]);

  function iniciarCronometro() {
    setRodando(true);
  }

  function pararCronometro() {
    setRodando(false);
  }

  function resetarCronometro() {
    setRodando(false);
    setMilisegundos(0);
  }
  
  const minutos = Math.floor(milisegundos / 60000);
  const segundos = Math.floor((milisegundos % 60000) / 1000);
  const ms = Math.floor((milisegundos % 1000) / 10);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cronômetro</Text>
      <View style={styles.relogioWrapper}>
        <Text style={styles.relogio}>
          {String(minutos).padStart(2, "0")}:
          {String(segundos).padStart(2, "0")}:
          {String(ms).padStart(2, "0")}
        </Text>
      </View>
      <View style={styles.botoes}>
        <TouchableOpacity style={styles.botao} onPress={iniciarCronometro}>
          <Text style={styles.textoBotao}>Iniciar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={pararCronometro}>
          <Text style={styles.textoBotao}>Pausar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={resetarCronometro}>
          <Text style={styles.textoBotao}>Resetar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  relogioWrapper: {
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  relogio: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#0f0",
  },
  botoes: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  botao: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
  },
});

