import "./Search.css";

import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useState } from "react";
import NewCrit from "../NewCrit/NewCrit";

function Search() {

    // COTE RECHERCHE DE LIVRES !! // TODO : à foutre dans son propre composant. 

    const [book, setBook] = useState(""); // ce qui est récupéré dans notre formulaire (au handlechange)
    const [result, setResult] = useState([]); // ce qui est récupéré après le handlesubmit
    const [apiKey, setApiKey] = useState('AIzaSyAwExowwTiBhd-qmxu5T8aIZbrVQWekT40') // mettre notre clefs api dans une variable, l'idéal aurait été dans un .env, certes...
    const [isSearch, setIsSearch] = useState(false); // cette variable sert à affiche la boite de résultats lorsque l'on lance une recheche avec un affichage conditionnel
    const [auteur, setAuteur] = useState();
    const [livre, setLivre] = useState();
    const [resume, setResume] = useState();
    const [thumbnail, setThumbnail] = useState();
    

    // récuperation de données au subit et injection dans le fetch 
    function handleClick() {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${apiKey}&maxResults=9`) // le maxresults monte de 10 à 40 sur l'api google books // le max résults je l'ai rajouté pour ne pas avoir un putain d'array de 40 à chaque réusltat
            .then((res) => res.json()                                                                         // rapidement le bordel
                .then((data) => {
                    setResult(data) // envoi dans le result. (ce qui va nous servir à les afficher par la suite)
                    setIsSearch(true) // lorsque la recheche est terminée, nous passons l'affichage conditionnel en true pour l'afficher plus bas.
                })
            )
    }

    // récuperation de ce qu'il a dans l'input
    function handleChange(event) {
        const book = event.target.value
        setBook(book);
    } //expedition dans le setter de books. c'est celui qu'on va récupérer pour faire le fetch sur l'API google books.

    // J'ai crée une fonction pour chaque résultat de recherche.
    // Je me demande s'il n'y aurais pas un truc plus sexy pour les récupérer comme la fonction setter. Mais pour l'instant on va faire comme ça.
    // le principale obstacle à en faire une fonction plus sexy qu'un CTRL+C / CTRL+V sont les differents chiffres là dedans : result.items.[0].truc
    // maintenant c'est de savoir comment on va passer ces informations d'un élément à l'autre et surtout comment on les mets dans mongo ? 


//items[0].volumeInfo.description

    function handleSearch0() {
        setAuteur(result?.items?.[0]?.volumeInfo?.authors?.[0])
        setLivre(result?.items?.[0]?.volumeInfo?.title)
        setResume(result?.items?.[0]?.volumeInfo?.description)
        setThumbnail(result?.items?.[0]?.volumeInfo?.imageLinks?.smallThumbnail)

    }

    function handleSearch1() {
        setAuteur(result?.items?.[1]?.volumeInfo?.authors?.[0])
        setLivre(result?.items?.[1]?.volumeInfo?.title)
        setResume(result?.items?.[1]?.volumeInfo?.description)
        setThumbnail(result?.items?.[1]?.volumeInfo?.imageLinks?.smallThumbnail)
    }
    function handleSearch2() {
        setAuteur(result?.items?.[2]?.volumeInfo?.authors?.[0])
        setLivre(result?.items?.[2]?.volumeInfo?.title)
        setResume(result?.items?.[2]?.volumeInfo?.description)
        setThumbnail(result?.items?.[2]?.volumeInfo?.imageLinks?.smallThumbnail)
    }
    function handleSearch3() {
        setAuteur(result?.items?.[3]?.volumeInfo?.authors?.[0])
        setLivre(result?.items?.[3]?.volumeInfo?.title)
        setResume(result?.items?.[3]?.volumeInfo?.description)
        setThumbnail(result?.items?.[3]?.volumeInfo?.imageLinks?.smallThumbnail)
    }
    function handleSearch4() {
        setAuteur(result?.items?.[4]?.volumeInfo?.authors?.[0])
        setLivre(result?.items?.[4]?.volumeInfo?.title)
        setResume(result?.items?.[4]?.volumeInfo?.description)
        setThumbnail(result?.items?.[4]?.volumeInfo?.imageLinks?.smallThumbnail)
    }
    function handleSearch5() {
        setAuteur(result?.items?.[5]?.volumeInfo?.authors?.[0])
        setLivre(result?.items?.[5]?.volumeInfo?.title)
        setResume(result?.items?.[5]?.volumeInfo?.description)
        setThumbnail(result?.items?.[5]?.volumeInfo?.imageLinks?.smallThumbnail)
    }
    function handleSearch6() {
        setAuteur(result?.items?.[6]?.volumeInfo?.authors?.[0])
        setLivre(result?.items?.[6]?.volumeInfo?.title)
        setResume(result?.items?.[6]?.volumeInfo?.description)
        setThumbnail(result?.items?.[6]?.volumeInfo?.imageLinks?.smallThumbnail)
    }
    function handleSearch7() {
        setAuteur(result?.items?.[7]?.volumeInfo?.authors?.[0])
        setLivre(result?.items?.[7]?.volumeInfo?.title)
        setResume(result?.items?.[7]?.volumeInfo?.description)
        setThumbnail(result?.items?.[7]?.volumeInfo?.imageLinks?.smallThumbnail)
    }
    function handleSearch8() {
        setAuteur(result?.items?.[8]?.volumeInfo?.authors?.[0])
        setLivre(result?.items?.[8]?.volumeInfo?.title)
        setResume(result?.items?.[8]?.volumeInfo?.description)
        setThumbnail(result?.items?.[8]?.volumeInfo?.imageLinks?.smallThumbnail)
    }

    return (

        <div className="newSearch-box">
            <Form>
                <h2 className="searchH3">Recherche ton bouquin</h2>
                <FloatingLabel controlId="floatingTextarea2" label="Recherche pas livre, auteur ?" className="mb-3" >
                    <Form.Control as="textarea"
                        type="texte"
                        autocomplete="off"
                        name="livre"
                        onChange={handleChange}
                    />
                </FloatingLabel>
                <Button className="boutonSearch" onClick={handleClick}> Recherche </Button>
            </Form>

            {isSearch &&
                <div className="searchBox">
                    <button onClick={handleSearch0} className="buttonSearchResult"> <div className="searchLivre2" ><img className="searchLivre" src={result?.items?.[0]?.volumeInfo?.imageLinks?.smallThumbnail} /> <p className="textSearch" >{result?.items?.[0].volumeInfo?.title}</p> </div></button>
                    <button onClick={handleSearch1} className="buttonSearchResult"> <div className="searchLivre2" ><img className="searchLivre" src={result?.items?.[1]?.volumeInfo?.imageLinks?.smallThumbnail} /> <p className="textSearch" >{result?.items?.[0].volumeInfo?.title}</p> </div></button>
                    <button onClick={handleSearch2} className="buttonSearchResult"> <div className="searchLivre2" ><img className="searchLivre" src={result?.items?.[2]?.volumeInfo?.imageLinks?.smallThumbnail} /> <p className="textSearch" >{result?.items?.[0].volumeInfo?.title}</p> </div></button>
                    <button onClick={handleSearch3} className="buttonSearchResult"> <div className="searchLivre2" ><img className="searchLivre" src={result?.items?.[3]?.volumeInfo?.imageLinks?.smallThumbnail} /> <p className="textSearch" >{result?.items?.[0].volumeInfo?.title}</p> </div></button>
                    <button onClick={handleSearch4} className="buttonSearchResult"> <div className="searchLivre2" ><img className="searchLivre" src={result?.items?.[4]?.volumeInfo?.imageLinks?.smallThumbnail} /> <p className="textSearch" >{result?.items?.[0].volumeInfo?.title}</p> </div></button>
                    <button onClick={handleSearch5} className="buttonSearchResult"> <div className="searchLivre2" ><img className="searchLivre" src={result?.items?.[5]?.volumeInfo?.imageLinks?.smallThumbnail} /> <p className="textSearch" >{result?.items?.[0].volumeInfo?.title}</p> </div></button>
                    <button onClick={handleSearch6} className="buttonSearchResult"> <div className="searchLivre2" ><img className="searchLivre" src={result?.items?.[6]?.volumeInfo?.imageLinks?.smallThumbnail} /> <p className="textSearch" >{result?.items?.[0].volumeInfo?.title}</p> </div></button>
                    <button onClick={handleSearch7} className="buttonSearchResult"> <div className="searchLivre2" ><img className="searchLivre" src={result?.items?.[7]?.volumeInfo?.imageLinks?.smallThumbnail} /> <p className="textSearch" >{result?.items?.[0].volumeInfo?.title}</p> </div></button>
                    <button onClick={handleSearch8} className="buttonSearchResult"> <div className="searchLivre2" ><img className="searchLivre" src={result?.items?.[8]?.volumeInfo?.imageLinks?.smallThumbnail} /> <p className="textSearch" >{result?.items?.[0].volumeInfo?.title}</p> </div></button>
                </div>
            }
        
        <NewCrit auteur={auteur} livre={livre} resume={resume} thumbnail={thumbnail} isSearch={isSearch}/>
        </div>


    )
}
export default Search;





