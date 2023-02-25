import React, { FC, ReactNode } from 'react';
import './MainLayout.less';
import Utils from '../../Utils/Utils';
import { NavBar } from './NavBar';
type Props = {
  children?: ReactNode | undefined;
  disabledZone?: boolean;
};
export const MainLayout: FC<Props> = (props) => {
  return (
    <>
      <main className={'main'}>
        <NavBar />
        <article
          className={Utils.mergeClasses({
            article: true,
            articleSearch: true,
          })}>
          <div>{props.children}</div>
        </article>
      </main>
    </>
  );
};
