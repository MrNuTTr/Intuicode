import React from 'react';
import { Theme } from '@radix-ui/themes';

const CoduxTheme = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    return (props: P) => (
        <Theme accentColor="brown" grayColor="sand" radius="medium" appearance="dark">
            <WrappedComponent {...props} />
        </Theme>
    );
};

export default CoduxTheme;