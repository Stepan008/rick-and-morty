export default class RamService {
    _apiBase = 'https://rickandmortyapi.com/api';

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
        throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`)
        }
        return await res.json();
    }
    
    getCharsPage = async (page) => {
        const res = await this.getResource(`/character/?page=${page}`);
        return res;
    };

    getChar = async (id) => {
        const res = await this.getResource(`/character/${id}`);
        return res;
    };
}
