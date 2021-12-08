import "./Signin.css";

// si vous utiliser bootsrap n'oubliez pas d'importer vos élements. 
// bootstrap c'est vraiment pas mal pour faire votre squellette et avancer sur d'autres trucs
// avec le temps précieux gagné vous pourrez faire des trucs plus ouf dans votre back avec le temps imparti
// à la fin, si tout est fait, vous y revenez et vous personnallisez vraiment votre css/faites des trucs à la mano

import { Button, Form } from 'react-bootstrap';
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Signin() {

  // Constates d'état des differents inputs 
  const [pseudo, setPseudo] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [verifPassword, setverifPassword] = useState();

  // useHistory est pour renvoyer vers d'autres pages sans pour autan devoir la recharger.
  // elle s'active comme un composant react ou bootstrap sauf que elle vient du react-routeur-dom
  const history = useHistory()

  const handleSumbit = async (e) => {

    // récupére les inputs dans le body

    let submit = await { pseudo, email, password, verifPassword }

    // FONCTION FETCH 
    // ça t'envoie sur la route que tu veux utiliser. 
    // Le fetch il ya plein de propriétés (VERB) differentes
    // le minimum syndical pour qu'il fonctionne c'est la method, le stringify parce qu'il envoie sur un json et headers.
    // le Hearders, faut pas se poser de questions, c'est juste comme ça.

    return fetch(
      'http://localhost:5000/users', {
      method: 'POST',
      body: JSON.stringify(submit),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      // ces lignes c'est comme le headers, c'est comme ça et puis c'est tout
      // il attends la réponse du serveur. Type si l'émail et ou le pseudo n'a pas encore été utilisé. 
      // si vous voulez faire apparaître des message d'erreurs (du au pseudo ou à l'émail déjà utilisé ce sera ici)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        history.push("/Login")
      });
  }

  //Fonction Callback sur les inputs du formulaire
  // sexy version 
  function handleInput(e, setter) {
    setter(e.target.value)
  }

  return (
    <Form className="signInBox">
      <Form.Group className="mb-3" >
        <Form.Label><span className="labelSign"> Pseudo</span></Form.Label>
        <Form.Control className="test" type="text" placeholder="Choisis ton Pseudo" name="pseudo" onInput={(e) => handleInput(e, setPseudo)} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label><span className="labelSign"> Adresse email</span></Form.Label>
        <Form.Control type="email" placeholder="Roger@Bocal.Academy" name="email" onInput={(e) => handleInput(e, setEmail)} />
        <Form.Text className="text-muted">
          <span className="lightSign"> On garde ton email pour nous t'inquiètes ! </span>
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label><span className="labelSign"> Mot de passe</span></Form.Label>
        <Form.Control type="password" placeholder="Mot de passe" name="password" onInput={(e) => handleInput(e, setPassword)} />
        <Form.Text className="text-muted">
          <span className="lightSign">Mets pas un truc de fou, on a codé ça en une semaine</span>
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label><span className="labelSign"> Veuillez verifier votre mot de passe</span></Form.Label>
        <Form.Control type="password" placeholder="Confirmer le mot de passe" name="verifPassword" onInput={(e) => handleInput(e, setverifPassword)} />
      </Form.Group>
      <Button className="boutonSignin" onClick={() => handleSumbit()}>
        Crée ton compte
      </Button>
    </Form>
  );
}

export default Signin;