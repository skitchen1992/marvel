import './charInfo.scss';
import {Component} from "react"
import MarvelService from "../../service/MarvelService";
import Skeleton from "../skeleton/Skeleton";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../error/ErrorMessage";


class CharInfo extends Component {
    state = {
        char: null ,
        loading: false ,
        error: false
    }
    marvelService = new MarvelService();

    componentDidUpdate(prevProps ) {
        if(prevProps.selectedCharId !== this.props.selectedCharId){
            this.updateChar()
        }
    }

    componentDidMount() {
        this.updateChar();
    }

    onCharLoaded = (char) => {
        this.setState({char , loading: false})

    }
    onError = () => {
        this.setState({error: true , loading: false})
    }
    onCharLoading = () => {
        this.setState({loading: true})
    }

    updateChar = () => {
        const {selectedCharId} = this.props;
        if (!selectedCharId) {
            return;
        }
        this.onCharLoading()
        this.marvelService
            .getCharacters(selectedCharId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }


    render() {
        const {char , loading , error} = this.state;
        const skeleton = char || loading || error ? null:  <Skeleton/>
        const content = !(loading || error || !char) ? <View char={char}/> : null;
        const spinner = loading ? <Spinner/> : null
        const errorMessage = error ? <ErrorMessage/> : null
        return (
            <div className="char__info">
                {content}
                {skeleton }
                {spinner}
                {errorMessage}
            </div>
        )
    }
}


const View = ({char}) => {
    const {name , description , thumbnail , homepage , wiki , comics} = char
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {comics.map((item , i) => <li key={i} className="char__comics-item">{item.name}</li>).slice(0,10)}
            </ul>
        </>
    );
};


export default CharInfo;