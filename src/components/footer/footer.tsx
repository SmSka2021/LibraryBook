import icon1 from '../../assets/icon/Icon_SocialFs.png';
import icon2 from '../../assets/icon/icon-instagram.png';
import icon3 from '../../assets/icon/icon-vk.png';
import icon4 from '../../assets/icon/icon-linkedin.png';
import st from './footer.module.css';
import {httpUrl} from '../../shared/constants/url';

export const Footer = () =>  (
        <div className={st.footer}>
            <div className={st.footer__container_txt}>
                <p className={st.footer__txt}> &#169; 2020-2023 Cleverland.</p>
                <p className={st.footer__txt}>  Все права защищены.</p>
            </div>
            <div className={st.footer__container_img}>
                <a href={httpUrl} rel='noreferrer' target='_blank'><img className={st.footer__img} src={icon1}
                                                                                                 alt='social icon'/></a>
                <a href={httpUrl} rel='noreferrer' target='_blank'><img className={st.footer__img} src={icon2}
                                                                                                 alt='social icon'/></a>
                <a href={httpUrl} rel='noreferrer' target='_blank'><img className={st.footer__img} src={icon3}
                                                                                                 alt='social icon'/></a>
                <a href={httpUrl} target='_blank' rel='noreferrer'><img className={st.footer__img} src={icon4}
                                                                                                 alt='social icon'/></a>
            </div>
        </div>
    );

