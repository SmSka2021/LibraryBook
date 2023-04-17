import React, {useState} from 'react';
import st from './not-order-blue.module.css';


export const NotOrderBlue = (props:{title:string}) =>
      (
        <div className={st.empty__field} data-test-id='empty-blue-card'>
            <p className={st.empty__message}>{props.title} </p>
        </div>
      );

