import React from 'react';

import Backdrop from '@mui/material/Backdrop';
import { usePromiseTracker } from 'react-promise-tracker';
import { Section, Article, Prop, list } from "./spinners";
import ReactLoading from "react-loading";

export default function LoadingBackdrop(props) {
  const {promiseInProgress} = usePromiseTracker({delay:400})
  return (
    <div>
      {promiseInProgress ? 
        ( 
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}>
              <Section>
                {list.map(l => (
                  <Article key={l.prop}>
                    <ReactLoading type={l.prop} color="#fff" />
                    <Prop>{l.name}</Prop>
                  </Article>
                ))}
              </Section>
          </Backdrop>
        ) : null
      }
    </div>
  );
}
