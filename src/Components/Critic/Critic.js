import './Critic.css'
import { useEffect, useState } from "react";
import Comment from "../Comment/Comment";

// nous avons fait un composant séparé pour les commentaires et les critiques pour pouvoir plus facilement récupérer leurs ID et donc leurs assigner les differents commentaires
// nous nous sommes rendus compte, après avoir tout mis sur homepage en un block que ce ne serait pas possible
// de ce fait aussi nous allons crée une autre route, ainsi qu'une collection spécialement pour les commentaires
// en plus de celle que nous avons déjà pour les critiques et les users. 

function Critic() {

    const [postsList, setPostsList] = useState([]);
    const [user, setUser] = useState({ pseudo: "", email: "" })

    let token = localStorage.getItem("token")

    // Sinon pour le moment, elle utilise seulement (et simplement) un useEffect au chargement de la page pour pouvoir topper tous les titres/critiques et personnes ayant envoyé le commentaire.
    // ouais, rappellez vous, dans le composant NewCrit.js, nous récuperions le pseudo, que nous injections dans la deuxième collection de la BD

    useEffect(() => {
        fetch("http://localhost:5000/posts/critic", {
        })
            .then((res) => res.json())
            .then((criticList) => {
                setPostsList(criticList)
            })
    }, [])

    // nous allons d'une part chercher qui est connecté avec son token. 
    // nous ne l'utilisons pas encore mais ce sera important pour celui qui laissera un commentaire
    // comme ça nous pourrons utliser le user.pseudo pour faire un current user au moment de l'envoi du comm dans la base de données

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
                setUser(users)
            })
    }, [])


    return (

        <div>
            <h2 className="titreThread">Thread des Critiques Tendances</h2>
            <div>
                {postsList.map((item) =>
                    <div className="post-card">
                        <div className="post-content">
                            <div className="post-title">
                                <h4 className="titreCrit"><span className="titleCritHome">Titre du Livre</span> : {item.title} </h4>
                            </div>
                            <div className="post-critic">
                                <div className="laCrit">{item.critic}</div>
                                <div className="critCom">Cette critique vous a été proposé par {item.currentUser}</div>
                            </div>
                        </div>
                        <Comment currentPost={item._id}/>
                    </div>
                )}
            </div>

        </div>

    )
}

export default Critic;
