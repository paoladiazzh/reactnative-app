import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

export default function ButtonGame() {
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);
  
  const generateRandomPosition = () => {
    // Usamos valores fijos para el área de juego
    const gameAreaWidth = 300;  // Ancho del área de juego
    const gameAreaHeight = 400; // Alto del área de juego
    const buttonWidth = 150;    // Ancho del botón
    const buttonHeight = 60;    // Alto aproximado del botón
    
    // Calculamos el rango máximo para que el botón quede completamente dentro del área
    const maxX = gameAreaWidth - buttonWidth;
    const maxY = gameAreaHeight - buttonHeight;
    
    // Generamos posiciones aleatorias dentro del rango válido
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    
    setButtonPosition({ x, y });
  };
  
  const startGame = () => {
    setCount(0);
    setTimeLeft(5);
    setIsPlaying(true);
    generateRandomPosition();
  };

  const resetGame = () => {
    setCount(0);
    setTimeLeft(5);
    setIsPlaying(false);
    setButtonPosition({ x: 0, y: 0 });
  };
  
  const handleClick = () => {
    if (isPlaying) {
      setCount((prevCount) => prevCount + 1);
      generateRandomPosition();
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Juego de Clicks!</Text>
      
      {!isPlaying && timeLeft === 5 ? (
        <TouchableOpacity 
          style={styles.startButton}
          onPress={startGame}
        >
          <Text style={styles.buttonText}>Comenzar Juego</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.gameContainer}>
          <Text style={styles.timer}>Tiempo restante: {timeLeft}s</Text>
          <View style={styles.gameArea}>
            <TouchableOpacity 
              style={[
                styles.clickButton, 
                !isPlaying && styles.disabledButton,
                {
                  position: 'absolute',
                  left: buttonPosition.x,
                  top: buttonPosition.y,
                }
              ]}
              onPress={handleClick}
              disabled={!isPlaying}
            >
              <Text style={styles.buttonText}>¡Click!</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.score}>Clicks: {count}</Text>
        </View>
      )}
      
      {timeLeft === 0 && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>¡Juego terminado!</Text>
          <Text style={styles.finalScore}>Puntaje final: {count} clicks</Text>
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={resetGame}
          >
            <Text style={styles.buttonText}>Reiniciar Juego</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#FF5722',
    padding: 15,
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
    marginTop: 20,
  },
  gameContainer: {
    alignItems: 'center',
    gap: 20,
  },
  gameArea: {
    width: 300,
    height: 400,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  timer: {
    fontSize: 18,
    marginBottom: 10,
  },
  clickButton: {
    backgroundColor: '#2196F3',
    padding: 20,
    borderRadius: 8,
    width: 150,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 20,
    marginTop: 10,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 20,
    marginBottom: 10,
  },
  finalScore: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});