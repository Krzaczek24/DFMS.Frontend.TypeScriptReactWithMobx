import { observer } from 'mobx-react-lite'
import { Navigate, Route, Routes } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import { GreetingPage, HomePage, LoginPage, RegisterPage } from "../../../pages"

const AppRouter = observer(() => (
    <div className="content-container">
        <Routes>
            <Route path="/" element={<ProtectedRoute element={<HomePage />} notAllowedPathOrElement={<GreetingPage />} />} />
            <Route path="/login" element={<ProtectedRoute element={<Navigate to="/" />} notAllowedPathOrElement={<LoginPage />} />} />
            <Route path="/registration" element={<ProtectedRoute element={<Navigate to="/" />} notAllowedPathOrElement={<RegisterPage />} />} />
            <Route path="/protected" element={<ProtectedRoute roles={["ADMIN"]} permissions={["TESTOWE_PRAWO"]} element={<LoginPage />} />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </div>
))

export default AppRouter