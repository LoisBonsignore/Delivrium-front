import './Navbar.css'

// si vous utiliser bootsrap n'oubliez pas d'importer vos élements. 
// bootstrap c'est vraiment pas mal pour faire votre squellette et avancer sur d'autres trucs
// avec le temps précieux gagné vous pourrez faire des trucs plus ouf dans votre back avec le temps imparti
// à la fin, si tout est fait, vous y revenez et vous personnallisez vraiment votre css/faites des trucs à la mano

import { Navbar, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";


// La navbar est conditionnelle en ternaire, c'est à dire qu'elle prends en compte le status "isLog" que nous avons transféré à plusieurs enfants de app.js
// { isLog ? <>Tout ce qui apparait quand on est log <>
// : <>tout ce qui arpparait quand on est pas log<>
//   }
// notez bien {condition ? : }
// le ? est le if, le : est le else. 

// Le logout va juste topper notre token dans le localStorage pour le supprimer, ce qui nous sort automatiquement du site. 
// pour le coup nous rechargeons la page acec document.location.replace('/')


function Navigation({ isLog, setIsLog }) {

    function handleLogout() {
        localStorage.removeItem('token');
        document.location.replace('/');
        
    }
    return (
        <div>
            <Navbar className="navigation">
                {isLog ?
                    <Container>
                        <Navbar.Brand>
                            <Link className="navElement" to="./">
                                <span className="navText">De~Livre~ium</span>
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Text>
                            <Navbar.Collapse className="justify-content-end">
                                <Link className="navElement" to="./Homepage">
                                    <span className="navText2">Critiques</span>
                                </Link>
                                <Link className="navElement" to="./Critique">
                                    <span className="navText2">Ma Critique</span>
                                </Link>
                                <Link className="navElement" to="./Profil">
                                    <span className="navText2">Profil</span>
                                </Link>
                                <Link className="navElement" >
                                    <span className="navText2" onClick={() => handleLogout()}>Log Out</span>
                                </Link>
                            </Navbar.Collapse>
                        </Navbar.Text>
                    </Container>
                    :
                    <Container>
                        <Navbar.Brand>
                            <Link className="navElement" to="./">
                                <span className="navText">De~Livre~ium</span>
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Text>
                            <Navbar.Collapse className="justify-content-end">
                                <Link className="navElement" to="./Login">
                                    <span className="navText2">Login</span>
                                </Link>
                                <Link className="navElement" to="./Signin">
                                    <span className="navText2">Sign Up</span>
                                </Link>
                            </Navbar.Collapse>
                        </Navbar.Text>
                    </Container>
                }
            </Navbar>

        </div >
    )
}

export default Navigation;