import "./Comment.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


// si vous utiliser bootsrap n'oubliez pas d'importer vos élements. 
// bootstrap c'est vraiment pas mal pour faire votre squellette et avancer sur d'autres trucs
// avec le temps précieux gagné vous pourrez faire des trucs plus ouf dans votre back avec le temps imparti
// à la fin, si tout est fait, vous y revenez et vous personnallisez vraiment votre css/faites des trucs à la mano

import { Button } from 'react-bootstrap';

// nous avons fait un composant séparé pour les commentaires et les critiques pour pouvoir plus facilement récupérer leurs ID et donc leurs assigner les differents commentaires
// nous nous sommes rendus compte, après avoir tout mis sur homepage en un block que ce ne serait pas possible
// de ce fait aussi nous allons crée une autre route, ainsi qu'une collection spécialement pour les commentaires
// en plus de celle que nous avons déjà pour les critiques et les users. 

function Comment({ currentPost }) {


    // constante d'état récuperant le commentaire dans le formulaire
    const [comment, setComment] = useState([]);

    // constante d'état récuperant les commentaires dans la DB
    const [newComment, setNewComment] = useState([]);

    // pour récuperer le nom de l'user et le foutre ou on veut
    const [user, setUser] = useState({ pseudo: "", email: "" });
    let currentUser = user.pseudo

    // faut topper le token dans le localstorage pour un peu plus tard
    let token = localStorage.getItem("token")

    // Ce qui se passe quand on clique sur le commentaire
    function handleClick() {
        // comment est celui qui vient du formulaire
        // currentUser vient du useeffects qui le récupére du token
        // curent post nous vient du parents : comme ça il toppe l'_id sur chaque <Critic <Comment /> />
        let envoyerComm = { comment, currentUser, currentPost }

        fetch("http://localhost:5000/comment", {
            method: "POST",
            body: JSON.stringify(envoyerComm),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },  }).then(() => refrech())}


    // La fonction refrech est celle que l'on mets en fin de callback au niveau du handleclick.
    // comme ça, ça 'relance' la page et les commentaires peuvent être affichés instantanéments.
    function refrech() {

        let envoyerComm = { currentPost }
        fetch("http://localhost:5000/comment/get", {
            method: "POST",
            body: JSON.stringify(envoyerComm),
            headers: {
                "Content-Type": "application/json",
            }, })
            .then((res) => res.json())
            .then((comments) => {
                setNewComment(comments)}) }

    // nous allons d'une part chercher qui est connecté avec son token. 
    // nous ne l'utilisons pas encore mais ce sera important pour celui qui laissera un commentaire
    // comme ça nous pourrons utliser le user.pseudo pour faire un current user au moment de l'envoi du comm dans la base de données

    // nous utilisons des useEffects, sinon la page tournerait en boucle, jusqu'à fonte du process

    useEffect(() => {
        fetch("http://localhost:5000/users/info", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
            .then((res) => res.json())
            .then((users) => {
                setUser(users) }) }, [])

// ce usefeffect sert à relancer la fonction refrech une fois au chargement de la page, cela évite qu'il y a deux fois le même code sur la page
// DRY
    useEffect(() => {  refrech()}, [])
    

    // Hot & Sexy
    function handleInput(e, setter) { setter(e.target.value); }

    return (

        <div>
            <form>
                <div className="commentCrit">
                    <input className="inputCom" type="text" name="commentaire" placeholder="Quelque chose à rajouter ?" onInput={(e) => handleInput(e, setComment)} />
                    <Button className="buttonCrit" onClick={() => handleClick()}>
                        Commenter
                    </Button>
                </div>
            </form>
            {newComment.map((item) =>
                <div className="commentList">
                    <div>
                        <div className="commentaire"> <span className="currentUser">{item.currentUser}</span> à dit ça : {item.comment}</div>
                    </div>
                </div>
            )}
        </div>
    )

}

export default Comment;