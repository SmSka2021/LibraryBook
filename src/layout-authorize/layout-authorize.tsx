
import {Outlet} from 'react-router-dom';
import st from './layuot-authorize.module.css';
import {Loader} from '../components/loader';
import {MessageRegistration} from '../components/message-registration';

export const LayoutAuthorize = () =>  (

            <main className={st.wrapper} data-test-id='auth'>
                <Loader />
                <h2 className={st.title}>Cleverland</h2>
                <Outlet/>
                <MessageRegistration/>
            </main>

)



