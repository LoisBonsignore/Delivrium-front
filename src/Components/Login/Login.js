import "./Login.css";

// si vous utiliser bootsrap n'oubliez pas d'importer vos élements. 
// bootstrap c'est vraiment pas mal pour faire votre squellette et avancer sur d'autres trucs
// avec le temps précieux gagné vous pourrez faire des trucs plus ouf dans votre back avec le temps imparti
// à la fin, si tout est fait, vous y revenez et vous personnallisez vraiment votre css/faites des trucs à la mano

import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Login({ isLog, setIsLog, token }) {

  // Nos petites constantes d'état qui vont bient

  const [pseudo, setPseudo] = useState();
  const [password, setPassword] = useState();
  const history = useHistory()

  function handleClick() {

    let submit = { pseudo, password };

    // la fonction fetch ici envoie directement les informations dans le back pour qu'elles soient traités
    // elle passe la fonctoin setIsLog en true si la réponse du serveur est positive.
    // nous pourrions rajouter des erreurs et des popsup jolis si la personne s'est trompé dans le mpd ou dans son pseudo ou les deux
    // proposer aussi un lien pour se crée un compte le cas échéant.

    fetch("http://localhost:5000/users/login", {
      method: "POST",
      body: JSON.stringify(submit),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })// si la res renvoi un status 200, lui passer le setIsLog en true, aller mettre le token dans le localStorage et tout le tralalalala
      .then((res) => res.json()) // si la réponse est pas 200, il envoie une alerte pour dire que ça va pas
      .then((json) => {
        localStorage.setItem("token", json.token); // <--- entrée du token dans le localStorage pour pouvoir le récup dans les autres composants
        setIsLog(true);
        history.push("/"); // on est automatiquement renvoyé sur (."/") c'est globalemetn la même page que la page de login, sauf que la l'affichage ternaire rentre en compte
      })
      .catch((err) => console.log(err));
  }

  // LA SEXYYY HOT FUNCTION
  function handleInput(e, setter) {
    setter(e.target.value);
  }

  return (
    <div>
      {isLog === false &&
        <Form className="loginBox">
          <Form.Group className="mb-3">
            <Form.Label>
              <span className="labelLog">Pseudo</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Entre ton pseudo"
              onInput={(e) => handleInput(e, setPseudo)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <span className="labelLog">Mot de passe</span>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Mot de passe"
              onInput={(e) => handleInput(e, setPassword)}
            />
          </Form.Group>
          <Button className="boutonLogin" onClick={() => handleClick()}>
            Valider
          </Button>
        </Form>
      }
      {isLog === true && <div></div>
      }



    </div>
  );
}

export default Login;
