import "./NewCrit.css";

// si vous utiliser bootsrap n'oubliez pas d'importer vos élements. 
// bootstrap c'est vraiment pas mal pour faire votre squellette et avancer sur d'autres trucs
// avec le temps précieux gagné vous pourrez faire des trucs plus ouf dans votre back avec le temps imparti
// à la fin, si tout est fait, vous y revenez et vous personnallisez vraiment votre css/faites des trucs à la mano

import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Search from '../Search/Search';

// dans cet element nous alons chopper l'user d'un côté via son token
// ce sera décodé dans le back pour qu'on puisse récupéré son pseudo
// une fois qu'on a le pseudo, on peut le rajouter dans une petite ligne, pour qu'il sache que ce qu'il dira pourra être retenu contre lui
// mais le currentUser/user.pseudo va aussi nous servir à l'injecter dans le commentaire. 
// comme ça chaque commentaire sera lié au pseudo et nous pourrons plus facilement sortir les informations en cas de besoin

function NewCrit({auteur, livre, resume, thumbnail, isSearch}) {

  // récuperation des données dans le formulaire
  const [title, setTitle] = useState();
  const [critic, setCritic] = useState();

  // récuperation d'utilisateur et son token pour lui dire coucou
  const [user, setUser] = useState({ pseudo: "", email: "" });
  let currentUser = user.pseudo
  let token = localStorage.getItem("token")

  // déplacer l'utilisateur sur les critiques une fois qu'il a terminé.
  const history = useHistory()

  // ce qui se passe au moment du click. 
  // il récupère le titre, la critic et le currentUser de l'useEffect d'au dessus, il va la poster directement dans la BD
  // notez qu'il serait utile de faire de même lors de la création de commentaire au niveau du CurrentUser.
  // notez aussi que c'est dans le même coin de la BD donc ça va être plutôt facile à mettre en place 

  function handleClick() {

    let click = { title, critic, currentUser, auteur, livre, resume, thumbnail }

    fetch("http://localhost:5000/posts", {
      method: "POST",
      body: JSON.stringify(click),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        history.push("/Homepage")
      });
  }

  // Le useEffect pour récupérer le nom de l'utilisateur.
  useEffect(() => {
    fetch("http://localhost:5000/users/info", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((res) => {
        setUser(res)
      })
  }, [])

  // la fonction sexy de jeremy, vous devriez vraiment l'écire sur un postit, même Antonin l'à grave trop kiffé
  // je vous invite à prendre cinq minutes pour la comprendre, franchement vous allez aimer

  function handleInput(e, setter) {
    setter(e.target.value);
  }

  return (
    <div className="main">

      <Form className="newCrit-box">
        <h2 className="newCritH2">Balance ta critique!</h2>
        <FloatingLabel controlId="floatingTextarea" label="Titre du Livre" className="mb-3" >
          <Form.Control as="textarea" placeholder="Titre" name="title" onInput={(e) => handleInput(e, setTitle)} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingTextarea2" label="Ta critique">
          <Form.Control as="textarea" placeholder="Ta critique" style={{ height: "200px" }} name="critic" onInput={(e) => handleInput(e, setCritic)} />
        </FloatingLabel>
{isSearch &&
<div>
        <div className="ladiv"> Tu vas critiquer {livre} de {auteur}</div>
        <div className="ladiv"> Petit résumé : {resume} </div>
</div>}
        <div className="ladiv">Salut {user.pseudo}, ton commentaire sera visible par les autres `=)` </div>
        <Button className="boutonNewCrit" onClick={() => handleClick()}>
          Envoyer quand même !
        </Button>
      </Form>

    </div>
  );
}

export default NewCrit;
