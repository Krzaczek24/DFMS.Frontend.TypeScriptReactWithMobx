import StoreInterface from '../StoreInterface'
import RootStore from '..'
import { makeAutoObservable } from 'mobx'
import AuthenticationService from '../../services/AuthenticationService'

export type RegisterResult = 'SUCCESS' | 'ERROR' | 'FAILURE'

class RegistrationStore implements StoreInterface {
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

    //accessor firstName: string = ''
    private _firstName: string = ''
    public get firstName() { return this._firstName }
    public set firstName(value: string) { this._firstName = value }

    //accessor lastName: string = ''
    private _lastName: string = ''
    public get lastName() { return this._lastName }
    public set lastName(value: string) { this._lastName = value }

    //accessor email: string = ''
    private _email: string = ''
    public get email() { return this._email }
    public set email(value: string) { this._email = value }

    //accessor test: string = ''
    private _test: string = ''
    public get test() { return this._test }
    public set test(value: string) { this._test = value }

    submit = async(): Promise<RegisterResult> => {
        try {
            await AuthenticationService.register(this._username, this._password, this._firstName, this._lastName)
            return AuthenticationService.isLoggedIn() ? 'SUCCESS' : 'FAILURE'
            
        } catch (exception) {
            return 'ERROR'
        }
    }
}

export default RegistrationStore