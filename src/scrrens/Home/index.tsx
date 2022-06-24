import React from 'react'
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo.svg'

import { Car } from '../../components/Car'

import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList,
} from './styles'

export function Home(){
    const carData = {
        brand: 'Audi',
        name: 'RS 5 Coupé',
        rent: {
            period: 'AO DIA',
            price: 120,
        },
        thumbnail: 'https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png',
    }

    return (
        <Container>
            <StatusBar
                barStyle='light-content'
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />
                    <TotalCars>Total de 12 carros</TotalCars>
                </HeaderContent>
            </Header>

            <CarList
                data={[1,2,3,4,5,6,7,8,9]}
                keyExtractor={item => String(item)}
                renderItem={({item}) => <Car data={carData}/>}
            />

        </Container>
    )
}