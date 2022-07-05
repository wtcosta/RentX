import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { ParamListBase, NavigationProp, useNavigation } from '@react-navigation/native'

import Logo from '../../assets/logo.svg'
import { api } from '../../services/api'
import { CarDTO } from '../../dtos/CarDTO'

import { Car } from '../../components/Car'
import { Load } from '../../components/Load'

import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList,
} from './styles'

export function Home(){
    const [cars, setCars] = useState<CarDTO[]>([])
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    const carData = {
        brand: 'Audi',
        name: 'RS 5 Coupé',
        rent: {
            period: 'AO DIA',
            price: 120,
        },
        thumbnail: 'https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png',
    }

    function handleCarDetails(){
        navigation.navigate('CarDetails')
    }

    useEffect(() => {
        async function fetchCars(){
            try {
                const response = await api.get('/cars')
                setCars(response.data)
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }

        fetchCars()
    }, [])

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

            { loading ? <Load /> :
                <CarList
                    data={cars}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <Car data={item} onPress={handleCarDetails}/>}
                />
            }

        </Container>
    )
}