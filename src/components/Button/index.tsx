import React from 'react'
import { useTheme } from 'styled-components'

import {
    Container,
    Title
} from './styles'

interface Props {
    title: string;
    color?: string;
    disabled?: boolean;
    onPress: () => void;
}

export function Button({title, color, disabled, ...rest}: Props){
    const theme = useTheme()

    return (
        <Container
            color={color ? color : theme.colors.main}
            disabled={disabled}
            style={{opacity: disabled === true ? 0.5 : 1}}
            {...rest}
        >
            <Title>{title}</Title>
        </Container>
    )
}