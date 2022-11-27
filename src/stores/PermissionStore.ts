import RootStore, { StoreBase } from "."

class PermissionStore extends StoreBase {
    constructor(rootStore: RootStore) {
        super(rootStore)
    }
}

export default PermissionStore