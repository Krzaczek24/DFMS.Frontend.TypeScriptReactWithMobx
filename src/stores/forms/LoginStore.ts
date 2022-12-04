import IStore from '../IStore'
import RootStore from '..'
import AuthenticationService from '../../services/AuthenticationService'
import { makeAutoObservable } from 'mobx'

export type LoginResult = 'SUCCESS' | 'ERROR' | 'FAILURE'

class LoginStore implements IStore {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }

    //accessor username: string = ''
    private _username: string = ''
    public get username() { return this._username }
    public set username(value: string) { this._username = value }

    //accessor password: string = ''
    private _password: string = ''
    public get password() { return this._password }
    public set password(value: string) { this._password = value }

    submit = async(): Promise<LoginResult> => {
        try {
            await AuthenticationService.login(this._username, this._password)
            return AuthenticationService.isLoggedIn() ? 'SUCCESS' : 'FAILURE'
            
        } catch (exception) {
            return 'ERROR'
        }
    }
}

export default LoginStore