import StoreInterface from './StoreInterface'
import RootStore from '.'
import { makeAutoObservable } from 'mobx'

class LoaderStore implements StoreInterface {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }

    private _isLoading: boolean = true
    get isLoading() { return this._isLoading }
    private set isLoading(value) { this._isLoading = value }

    private _isTransparent: boolean = true
    get isTransparent() { return this._isTransparent }
    private set isTransparent(value) { this._isTransparent = value }

    hide = () => {
        this.isLoading = false
        this.isTransparent = true
    }

    show = () => {
        this.isLoading = true
        this.isTransparent = true
    }

    showWithBackground = () => {
        this.isLoading = true
        this.isTransparent = false
    }
}

export default LoaderStore