export const template = (name: string) => (`// This file is generated automatically. Don't change it.
import { ReactComponent } from './index.svg';

import { Icon, IIconProps } from '../Icon';

export function Icon${name}(props: IIconProps): JSX.Element {
    
    return (
        <Icon {...props}>
            <ReactComponent/>
        </Icon>
    );
}
`);
