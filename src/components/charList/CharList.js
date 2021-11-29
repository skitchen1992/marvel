import './charList.scss';
import {Component} from "react";
import MarvelService from "../../service/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../error/ErrorMessage";

class CharList extends Component {
    state = {
        charList: [] ,
        loading: true ,
        error: false ,
        newItemLoading: false ,
        offset: 200 ,
        charEnded: false
    }
    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChars()
    }

    onCharListLoaded = (newCharList) => {
        let ended = false
        if(newCharList.length < 9) {
            ended = true
        }
        this.setState(({charList , offset}) => ({
            charList: [...charList , ...newCharList] ,
            loading: false ,
            newItemLoading: false ,
            offset: offset + 9 ,
            charEnded: ended
        }))
    }
    onError = () => {
        this.setState({error: true , loading: false ,})
    }
    onRequest = (offset) => {
        this.onCharListLoading()
        this.updateChars(offset)

    }

    onCharListLoading() {
        this.setState({newItemLoading: true})
    }

    updateChars = (offset) => {
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    renderItems(arr) {
        const items = arr.map((item) => {
            let imgStyle = {'objectFit': 'cover'};
            if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'};
            }

            return (
                <li onClick={() => this.props.selectedChar(item.id)}
                    className="char__item"
                    key={item.id}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }


    render() {
        const {
            charList , loading , error , newItemLoading , offset , charEnded
        } = this.state
        const items = this.renderItems(charList);
        const spinner = loading ? <Spinner/> : null
        const errorMessage = error ? <ErrorMessage/> : null
        const content = !(loading || error) ? items : null
        return (
            <div className="char__list">
                {spinner}
                {errorMessage}
                {content}
                <button onClick={() => this.onRequest(offset)}
                        style={{display: charEnded ? "none" : "block"}}
                        disabled={newItemLoading}
                        className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }


}

export default CharList;
