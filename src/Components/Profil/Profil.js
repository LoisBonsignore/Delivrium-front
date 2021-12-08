import "./Profil.css";
import { useEffect, useState } from "react"

function Profil() {

  const [user, setUser] = useState({ pseudo: "", email: "" });
  const [postsList, setPostsList] = useState([]);
  const [bouquins, setBouquins] = useState([]);
  let token = localStorage.getItem("token")
  console.log(bouquins)

  // le profil va chercher les informations sur le porteur de token
  // pour cette raison on envoi le Authorisation directement dans le back pour qu'il puisse décoder le token là bas. 

  useEffect(() => {
    fetch("https://google-books.p.rapidapi.com/volumes?key=AIzaSyAOsteuaW5ifVvA_RkLXh0mYs6GLAD6ykc", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "book4.p.rapidapi.com",
        "x-rapidapi-key": "b2ef3f2c7amshaaae08f7447579fp18640cjsn4e6d35c5f0ef"
      }
    }).then(response => response.json())
      .then(livres => setBouquins(livres))
  }, [])

  useEffect(() => {
    fetch("http://localhost:5000/users/info", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((res) => {
        setUser(res)
      })
  }, [])

  // je vais aller chercher les posts aussi, je vais mapper le pseudo de l'utilisateur avec le pseudo relié aux différentes critiques.
  // si elles sont équivalentes je les publie dans la box correspondante. 
  // notez que je repasserais probablement par un autre useState.

  useEffect(() => {
    fetch("http://localhost:5000/posts/critic", {
    })
      .then((res) => res.json())
      .then((criticList) => {
        setPostsList(criticList)
      })
  }, [])

  return (
    <div>
      <div className="boxProfil">
        <div><h2 className="titreProfil">Informations sur mon Profil</h2></div>
        <div> <span className="spanProf">Pseudo</span> : {user.pseudo}</div>
        <div> <span className="spanProf">Mail</span> : {user.email} </div>
        <div> <span className="spanProf">Password</span> : Pas de Placeholder pour le mot de passe nan nan</div>
        <div> <span className="spanProf">Des Features en plus</span> : mais ce sera un jour peut-être </div>
      </div>
      <div className="boxProfil">
        <div><h2 className="titreProfil">Tes posts persos</h2></div>
        <div> En developpement </div>
        <div> </div>
      </div>
    </div>
  )
}

export default Profil;