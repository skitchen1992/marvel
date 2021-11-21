class MarvelService {
    _apiBase = "https://gateway.marvel.com:443/v1/public/"
    _apikey = "apikey=29bbfb3cad2a4bbf5b795dd3c737b5ec"


    getResource = async (url) => {
        let res = await fetch(url)
        if (!res) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }
        return await res.json()
    }
    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?${this._apikey}`)
        return res.data.results.map(this._transformCharacter)
    }
    getCharacters = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apikey}`)
        return this._transformCharacter(res.data.results[0])
    }
    _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description? char.description.slice(0,200) + "..." : " Character description not found",
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
        }
    }

}

export default MarvelService
