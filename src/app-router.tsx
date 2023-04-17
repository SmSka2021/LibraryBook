import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import {BookPage} from './pages/book';
import {MainPage} from './pages/main';
import {RegistrationPage} from './pages/registration';
import {LayoutMainPage} from './layout-main-page';
import {Rule} from './components/rule';
import {Contract} from './components/contract';
import {LayoutAuthorize} from './layout-authorize';
import {AuthPages} from './pages/authorize';
import {ForgotPasswordPage} from './pages/forgot-password';
import {Layout} from './layout';
import {CardAdmin} from "./components/card-admin";
import {ProfilePages} from "./pages/profile-pages";

export const AppRouter = () =>  (
        <HashRouter>
            <Routes>
                 <Route element={<Layout/>}>
                     <Route path='/profile' element={<ProfilePages/>}/>
                    <Route element={<LayoutMainPage/>}>
                        <Route path='/' element={<Navigate to='/books/all'/>}/>
                        <Route path='/books' element={<Navigate to='/books/all'/>}/>
                        <Route path='/books/:category' element={<MainPage/>}/>
                        <Route path='/rule' element={<Rule/>}/>
                        <Route path='/contract' element={<Contract/>}/>
                    </Route>
                    <Route path='/books/:category/:bookId' element={<BookPage/>}/>

                </Route>
                 <Route  element={<LayoutAuthorize/>}>
                    <Route path='/' element={<Navigate to='auth'/>}/>
                    <Route path='/auth' element={<AuthPages/>}/>
                    <Route path='/forgot-pass' element={<ForgotPasswordPage/>}/>
                    <Route path='/registration' element={<RegistrationPage/>}/>
                </Route>
            </Routes>
        </HashRouter>
    )

