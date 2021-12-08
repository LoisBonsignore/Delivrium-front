import './Splashscreen.css'

function Splashscreen({ isLog, setIsLog }) {

    // le splaschreen est juste le petit slogan.
    // j'ai préféré en faire un petit élément au cas ou je veuille le réutilisé plus tard. 

    return (
        <div>
            {isLog ?
                <div></div>
                :
                <div className="splash">
                    <div className="boxTitre">
                        <h1 className="titreSplash">CatchPhrase +
                            <br />
                            Slogan de Dingue !
                        </h1>
                    </div>
                    <div className="boxSplash1"></div>
                    <div className="boxSplash2"></div>
                </div>
            }
        </div>)
}

export default Splashscreen;