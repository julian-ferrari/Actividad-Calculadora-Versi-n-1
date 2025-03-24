import './App.css';
import React, { useState } from "react";

function App() {
  const [numero1, setNumero1] = useState("") 
  const [numero2, setNumero2] = useState("") 
  const [operacion, setOperacion] = useState(0) 
  const [resultado, setResultado] = useState(0)

  const cambiarNumero1 = (e) => {
    const valor = e.target.value
    setNumero1(valor)
    calcularResultado(numero2, valor, operacion)
  };

  const cambiarNumero2 = (e) => {
    const valor = e.target.value
    setNumero2(valor)
    calcularResultado(numero1, valor, operacion)
  };

  const cambiarOperacion = (op) => {
    setOperacion(op)
    calcularResultado(numero1, numero2, op)
  };

  const calcularResultado = (a, b, op) => {
    let num1 = parseFloat(a) || 0
    let num2 = parseFloat(b) || 0
    let res = 0

    switch (op) {
      case "+":
        res = num1 + num2;
        break
      case "-":
        res = num1 - num2;
        break
      case "*":
        res = num1 * num2;
        break
      case "/":
        res = num2 !== 0 ? num1 / num2 : "Error";
        break
      default:
        res = 0;
    }

    setResultado(res)
  };

  return (
    <div>
      <h2>Calculadora v1</h2>
      <div>
        <input 
          type="text" 
          value={numero1} 
          onChange={cambiarNumero1} 
          className="p-2 border border-gray-300 rounded-lg" 
        />
        <input 
          type="text" 
          value={numero2} 
          onChange={cambiarNumero2} 
          className="p-2 border border-gray-300 rounded-lg" 
        />
      </div>
      <div>
        <button onClick={() => cambiarOperacion("+")}>Suma</button>
        <button onClick={() => cambiarOperacion("-")}>Resta</button>
        <button onClick={() => cambiarOperacion("*")}>Producto</button>
        <button onClick={() => cambiarOperacion("/")}>División</button>
      </div>
      <h3>Resultado: {resultado}</h3>
    </div>
  );
}

export default App;

