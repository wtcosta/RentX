import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import { format } from 'date-fns'
import { ParamListBase, NavigationProp, useNavigation, useRoute } from '@react-navigation/native'

import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import { Accessory } from '../../components/Accessory'
import { Button } from '../../components/Button'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { CarDTO } from '../../dtos/CarDTO'
import { api } from '../../services/api'

import {
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    Accessories,
    Footer,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal,
} from './styles'

interface Params{
    car: CarDTO;
    dates: string[];
}

interface RentalPeriod{
    start: string;
    end: string;
}

export function SchedulingDetails(){
    const [loading, setLoading] = useState(false)
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

    const theme = useTheme()
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    const route = useRoute()
    const { car, dates } = route.params as Params

    const rentTotal = Number(dates.length * car.rent.price)

    async function handleConfirmRental(){
        setLoading(true);
        
        const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`)

        const unavailable_dates = [
            ...schedulesByCar.data.unavailable_dates,
            ...dates
        ]

        await api.post('/schedules_byuser', {
            user_id: 1,
            car,
            startDate: format(new Date(dates[0]), 'dd/MM/yyyy'),
            endDate: format(new Date(dates[dates.length - 1]), 'dd/MM/yyyy')
        })

        api.put(`/schedules_bycars/${car.id}`, {
            id: car.id,
            unavailable_dates
        })
        .then(() => navigation.navigate('SchedelingComplete'))
        .catch(() => {
            setLoading(false)
            Alert.alert('Não foi possível confirmar o agendamento')
        })
    }

    function handleBack(){
        navigation.goBack();
    }

    useEffect(() => {
        setRentalPeriod({
            start: format(new Date(dates[0]), 'dd/MM/yyyy'),
            end: format(new Date(dates[dates.length - 1]), 'dd/MM/yyyy')
        })
    }, [])

    return (
        <Container>
            <Header>
                <BackButton onPress={handleBack}/>
            </Header>
            <CarImages>
                <ImageSlider
                    imagesUrl={car.photos}
                />
            </CarImages>
            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>

                <Accessories>
                    {
                        car.accessories.map(accessory => (
                            <Accessory
                                key={accessory.type}
                                name={accessory.name}
                                icon={getAccessoryIcon(accessory.type)}
                            />
                        ))
                    }
                </Accessories>

                <RentalPeriod>
                    <CalendarIcon>
                        <Feather
                            name="calendar"
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>{rentalPeriod.start}</DateValue>
                    </DateInfo>

                    <Feather
                        name="chevron-right"
                        size={RFValue(10)}
                        color={theme.colors.shape}
                    />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue>{rentalPeriod.end}</DateValue>
                    </DateInfo>
                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>Total</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diarias`}</RentalPriceQuota>
                        <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>

            <Footer>
                <Button
                    title="Alugar Agora"
                    color={theme.colors.success}
                    onPress={handleConfirmRental}
                    disabled={loading ? true : false}
                    loading={loading}
                />
            </Footer>
        </Container>
    )
}