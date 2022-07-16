import React from 'react'
import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components'

import {
    Container,
    Title
} from './styles'

interface Props {
    title: string;
    color?: string;
    disabled?: boolean;
    loading?: boolean;
    onPress: () => void;
}

export function Button({title, color, disabled = false, loading = false, ...rest}: Props){
    const theme = useTheme()
    
    return (
        <Container
            color={color ? color : theme.colors.main}
            disabled={disabled}
            style={{opacity: (disabled === true || loading === true) ? .5 : 1}}
            {...rest}
        >
            {
                loading
                ? <ActivityIndicator color={theme.colors.shape} />
                : <Title>{title}</Title>
            }
        </Container>
    )
}