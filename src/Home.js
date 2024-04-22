// Home.js
import React, { useState } from 'react';
import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import './Home.css';

import { useNavigate } from 'react-router-dom';

const Home = ({ isAuthenticated, handleAuth}) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useNavigate();

  const handleToggleRegister = () => {
    setIsRegistering(!isRegistering);
  };

const handleRegister = async () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      //var user = userCredential.user;
      console.log('Usuario registrado con éxito');
      handleAuth();
      // ...
    })
    .catch((error) => {
      //var errorCode = error.code;
      //var errorMessage = error.message;
      console.error('Error al registrar usuario', error.message);
      // ..
    });

  };
  

// Home.js
const handleLogin = async () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid; // Obtener el UID del usuario
        handleAuth(uid);
        console.log("login exitoso")
        history("tip-splitter");
    })
  .catch((error) => {
    //const errorCode = error.code;
    //const errorMessage = error.message;
    console.log('Error al encontrar el usuario' + error);
  });

  };
  
  return (
    <div class="bg-transparent">
      <div id="logo"></div>
      <h1 className={"text-center"}>Tip Splitter</h1>
      <h3 className={"text-center"}>{isRegistering ? 'Registro' : 'Login'}</h3>
      <div className="container bg-transparent">
        <div id="login-box">
          <div className="row mb-2 text-center justify-content-center ">
            {isRegistering && (
              <input className="form-control" type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
            )}
          </div>
          <div className="row mb-2  ">
            <input className="form-control" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="row mb-2">
            <input className="form-control" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="row mb-2">
            <button className='btn-primary btn' onClick={isRegistering ? handleRegister : handleLogin}>
            {isRegistering ? 'Registrarse' : 'Iniciar sesión'}
            </button> 
          </div>
          <div className="row mb-2">
            <p className="p-0" onClick={handleToggleRegister}>
            {isRegistering ? '¿Ya tienes una cuenta? ' : '¿No tienes cuenta? '}
            <span className="toggleRegisterTxtBtn">{isRegistering ? 'Inicia sesión' : 'Regístrate'}</span>
            </p>
          </div>     
        </div>
        </div>
    </div>
  );
};

export default Home;
