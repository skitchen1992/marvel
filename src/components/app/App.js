import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import {Component} from "react"
import decoration from '../../resources/img/vision.png';
import ErrorBoundaries from "../errorBoundaries/ErrorBoundaries";

class App extends Component {
    state = {
        selectedCharId: null ,
    }

    onSelectedChar = (selectedCharId) => {
        this.setState({selectedCharId})
    }

    render() {
        const {selectedCharId} = this.state
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundaries>
                        <RandomChar/>
                    </ErrorBoundaries>
                    <div className="char__content">
                        <ErrorBoundaries>
                            <CharList selectedChar={this.onSelectedChar}/>
                        </ErrorBoundaries>
                        <ErrorBoundaries>
                            <CharInfo selectedCharId={selectedCharId}/>
                        </ErrorBoundaries>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }


}

export default App;