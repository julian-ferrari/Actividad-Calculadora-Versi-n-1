import './App.css';
import React, { useState, useRef } from "react";

function CalculadoraV1() {
  const [numero1, setNumero1] = useState("");
  const [numero2, setNumero2] = useState("");
  const [operacion, setOperacion] = useState(0);
  const [resultado, setResultado] = useState(0);

  const cambiarNumero1 = (e) => {
    const valor = e.target.value;
    setNumero1(valor);
    calcularResultado(valor, numero2, operacion);
  };

  const cambiarNumero2 = (e) => {
    const valor = e.target.value;
    setNumero2(valor);
    calcularResultado(numero1, valor, operacion);
  };

  const cambiarOperacion = (op) => {
    setOperacion(op);
    calcularResultado(numero1, numero2, op);
  };

  const calcularResultado = (a, b, op) => {
    let num1 = parseFloat(a) || 0;
    let num2 = parseFloat(b) || 0;
    let res = 0;

    switch (op) {
      case "+":
        res = num1 + num2;
        break;
      case "-":
        res = num1 - num2;
        break;
      case "*":
        res = num1 * num2;
        break;
      case "/":
        res = num2 !== 0 ? num1 / num2 : "Error";
        break;
      default:
        res = 0;
    }

    setResultado(res);
  };

  return (
    <div className="max-w-xs mx-auto p-4 flex flex-col items-center gap-6 font-thin">
      <h2 className="text-4xl text-center mb-2 text-gray-1000">Calculadora v1</h2>
      <div className="grid grid-cols-2 gap-2 w-full">
        <input
          type="text"
          value={numero1}
          onChange={cambiarNumero1}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <input
          type="text"
          value={numero2}
          onChange={cambiarNumero2}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>
      <div className="max-w-xs mx-auto p-10 grid grid-cols-2 gap-4 mt-6">
        <button onClick={() => cambiarOperacion("+")}
          className="bg-blue-300 hover:bg-blue-400 text-white py-2 px-4 rounded-lg transition-all duration-300 w-100 h-20 text-[23px] flex items-center justify-center active:scale-95 active:bg-blue-600">Suma</button>
        <button onClick={() => cambiarOperacion("-")}
          className="bg-red-300 hover:bg-blue-400 text-white py-2 px-4 rounded-lg transition-all duration-300 w-100 h-20 text-[23px] flex items-center justify-center active:scale-95 active:bg-blue-600">Resta</button>
        <button onClick={() => cambiarOperacion("*")}
          className="bg-yellow-300 hover:bg-blue-400 text-white py-2 px-4 rounded-lg transition-all duration-300 w-100 h-20 text-[23px] flex items-center justify-center active:scale-95 active:bg-blue-600">Producto</button>
        <button onClick={() => cambiarOperacion("/")}
          className="bg-green-300 hover:bg-blue-400 text-white py-2 px-4 rounded-lg transition-all duration-300 w-100 h-20 text-[23px] flex items-center justify-center active:scale-95 active:bg-blue-600">División</button>
      </div>
      <h3 className="text-xl text-center p-4 bg-gray-100 rounded-lg">Resultado: {resultado}</h3>
    </div>
  );
}

function CalculadoraV2() {
  const [input, setInput] = useState("")
  const [resultado, setResultado] = useState(0)
  const inputRef = useRef(null);

  const handleButtonClick = (value) => {
    const ultimoCaracter = input.slice(-1);
    const operadores = ["+", "-", "*", "/"];

    if (operadores.includes(value) && operadores.includes(ultimoCaracter)) {
      return;
    }

    if (value === ".") {
      const ultimoCaracter = input.split(/[\+\-\*\/]/).pop();
      if (ultimoCaracter.includes(".")) {
        return;
      }
    }

    if (operadores.includes(value) && input === "" && value !== "-") {
      return;
    }


    setInput(input + value);
    inputRef.current.focus();
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      calcularResultado();
    }
  };

  const calcularResultado = () => {
    try {
      const calcular = new Function(`return ${input}`);
      setResultado(calcular());
    } catch (error) {
      setResultado("Error");
    }
  };

  return (
    <div className="max-w-xs mx-auto p-4 flex flex-col items-center gap-6 font-thin">
      <h2 className="text-4xl text-center mb-2 text-gray-1000">Calculadora v2</h2>
      <div>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div>
        <button onClick={() => handleButtonClick("0")}>0</button>
        <button onClick={() => handleButtonClick("1")}>1</button>
        <button onClick={() => handleButtonClick("2")}>2</button>
        <button onClick={() => handleButtonClick("3")}>3</button>
        <button onClick={() => handleButtonClick("4")}>4</button>
        <button onClick={() => handleButtonClick("5")}>5</button>
        <button onClick={() => handleButtonClick("6")}>6</button>
        <button onClick={() => handleButtonClick("7")}>7</button>
        <button onClick={() => handleButtonClick("8")}>8</button>
        <button onClick={() => handleButtonClick("9")}>9</button>
        <button onClick={() => handleButtonClick(".")}>.</button>
        <button onClick={() => handleButtonClick("+")}>+</button>
        <button onClick={() => handleButtonClick("-")}>-</button>
        <button onClick={() => handleButtonClick("*")}>*</button>
        <button onClick={() => handleButtonClick("/")}>/</button>
        <button onClick={() => { setInput(""); setResultado(0); }}>C</button>
        <button onClick={calcularResultado}>=</button>
      </div>
      <h3>Resultado: {resultado}</h3>
    </div>
  );
}

function App() {
  const [version, setVersion] = useState(null);

  return (
    <div className="flex flex-col justify-between min-h-screen bg-blue-500">
      {version === null ? (
        <div className="flex flex-col items-center justify-center flex-grow">
          <h1 className="text-3xl text-white mb-6 text-center">Seleccione una versión de Calculadora</h1>
          <div className="flex gap-4">
            <button onClick={() => setVersion(1)} className="bg-green-500 hover:bg-green-700 text-white px-6 py-3 rounded-lg">Versión 1</button>
            <button onClick={() => setVersion(2)} className="bg-green-500 hover:bg-green-700 text-white px-6 py-3 rounded-lg">Versión 2</button>
            <button onClick={() => setVersion(3)} className="bg-green-500 hover:bg-green-700 text-white px-6 py-3 rounded-lg">Versión 3</button>
          </div>
        </div>
      ) : (
        <>
          <button onClick={() => setVersion(null)} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg absolute top-4 right-4">Volver</button>
          <div className="flex-grow flex flex-col items-center justify-center">
            {version === 1 && <CalculadoraV1 />}
            {version === 2 && <CalculadoraV2 />}
            {version === 3 && <h2 className="text-4xl text-white">Calculadora v3 en construcción...</h2>}
          </div>
        </>
      )}

      <footer className="w-full text-center p-4 bg-gray-200 text-gray-700">
        <p className="text-lg">Grupo: Julián Ferrari, Nicolás Díaz, Bautista Gómez, Franco Rubin, Juan Bravi</p>
      </footer>
    </div>
  );
}


export default App;



