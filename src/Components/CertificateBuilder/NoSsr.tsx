import React, {FC, PropsWithChildren, ReactNode, useEffect, useState} from 'react';

type Props = {
  fallback?: ReactNode;
};
export const NoSsr: FC<PropsWithChildren<Props>> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    setVisible(true);
  }, []);
  if (visible) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }
  if (props.fallback) {
    return <React.Fragment>{props.fallback}</React.Fragment>;
  }
  return <div />;
};
