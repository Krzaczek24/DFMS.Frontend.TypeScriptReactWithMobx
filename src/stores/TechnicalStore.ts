import RootStore from '.'
import StoreInterface from './StoreInterface'
import { makeAutoObservable } from 'mobx'
import { ITechnicalClient, TechnicalClient } from '../api/ApiClient'

const api = new TechnicalClient() as ITechnicalClient

class TechnicalStore implements StoreInterface {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)

        setTimeout(this.ping, 0)
    }

    private _interval: number = 5000
    get interval() { return this._interval }
    set interval(value) { this._interval = value }

    private _isAlive: boolean = false
    get isAlive() { return this._isAlive }
    private set isAlive(value) { this._isAlive = value }

    private _isPinging: boolean = false
    get isPinging() { return this._isPinging }
    private set isPinging(value) { this._isPinging = value }

    private _playAnimation: boolean = false
    get playAnimation() { return this._playAnimation }
    private set playAnimation(value) { this._playAnimation = value }

    private ping = async () => {
        this.isPinging = this.playAnimation = true

        const animationFinisher = setInterval(() => {
            if (!this.isPinging) {
                this.playAnimation = false
                clearInterval(animationFinisher)
            }
        }, 1000)

        try {
            await api.ping()
            this.isAlive = true
        } catch (exception) {
            this.isAlive = false
        }

        this.isPinging = false

        setTimeout(this.ping, this.interval)
    }
}

export default TechnicalStore