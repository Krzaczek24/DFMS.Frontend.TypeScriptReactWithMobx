import RootStore, { StoreBase } from '.'

class UserStore extends StoreBase {
    constructor(rootStore: RootStore) {
        super(rootStore)
    }
}

export default UserStore