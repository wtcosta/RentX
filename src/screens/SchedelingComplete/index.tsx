import React from 'react'
import { StatusBar, useWindowDimensions } from 'react-native'
import { ConfirmButton } from '../../components/ConfirmButton'
import { ParamListBase, NavigationProp, useNavigation } from '@react-navigation/native'

import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'

import {
    Container,
    Content,
    Title,
    Message,
    Footer,
} from './styles'

export function SchedelingComplete(){
    const { width } = useWindowDimensions()
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    function handleConfirmRental(){
        navigation.navigate('Home')
    }

    return (
        <Container>
            <StatusBar
                barStyle='light-content'
                backgroundColor="transparent"
                translucent
            />

            <LogoSvg width={width} />

            <Content>
                <DoneSvg width={80} height={80}/>
                <Title>Carro alugado!</Title>
                <Message>
                    Agora você só precisa ir {'\n'}
                    até a concessionaria da RENTX {'\n'}
                    pegar o seu automóvel.
                </Message>
            </Content>

            <Footer>
                <ConfirmButton title='Ok' onPress={handleConfirmRental}/>
            </Footer>
        </Container>
    )
}