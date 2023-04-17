import React, {useState} from 'react';
import st from './not-order-red.module.css';


export const NotOrderRed = (props:{title:string, text:string}) =>
      (
          <div className={st.old__order} data-test-id='expired'>
              <p className={st.empty__message}>{props.title}</p>
              <p className={st.empty__message_small}>{props.text}</p>
          </div>
      );

