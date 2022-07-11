import React, {useState} from 'react'
import { Alert, StatusBar } from 'react-native'
import { useTheme } from 'styled-components'
import { ParamListBase, NavigationProp, useNavigation, useRoute } from '@react-navigation/native'
import { format } from 'date-fns'

import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { CarDTO } from '../../dtos/CarDTO'
import {
    Calendar,
    DayProps,
    generateInterval,
    MarkedDateProps
} from '../../components/Calendar'

import ArrowSvg from '../../assets/arrow.svg'

import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    DateValueContainer,
    Content,
    Footer,
} from './styles'

interface RentalPeriod {
    startFormatted: string;
    endFormatted: string;
}

interface Params{
    car: CarDTO
}

export function Scheduling(){
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps)
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod> ({} as RentalPeriod)

    const route = useRoute()
    const { car } = route.params as Params
    const theme = useTheme()
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    function handleConfirmRental(){
        if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
            Alert.alert('Selecione o instervalo para alugar.')
        }else{
            navigation.navigate('SchedulingDetails', {
                car,
                dates: Object.keys(markedDates)
            })
        }
    }

    function handleBack(){
        navigation.goBack();
    }

    function handleChangeDate(date: DayProps){
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
        let end = date

        if(start.timestamp > end.timestamp){
            start = end
            end = start
        }
        setLastSelectedDate(end)

        const interval = generateInterval(start, end)
        setMarkedDates(interval)

        const firstDate = Object.keys(interval)[0]
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1]

        setRentalPeriod({
            startFormatted: format(new Date(firstDate), 'dd/MM/yyyy'),
            endFormatted: format(new Date(endDate), 'dd/MM/yyyy')
        })
    }

    return (
        <Container>
            <Header>
                <StatusBar
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                />
                <BackButton
                    onPress={handleBack}
                    color={theme.colors.shape}
                />

                <Title>
                    Escolha uma{'\n'}
                    data de início e{'\n'}
                    fim do aluguel
                </Title>

                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>De</DateTitle>
                        <DateValueContainer selected={!!rentalPeriod.startFormatted}>
                            <DateValue>
                                {rentalPeriod.startFormatted}
                            </DateValue>
                        </DateValueContainer>
                    </DateInfo>
                    <ArrowSvg />
                    <DateInfo>
                        <DateTitle>Até</DateTitle>
                        <DateValueContainer selected={!!rentalPeriod.endFormatted}>
                            <DateValue>
                                {rentalPeriod.endFormatted}
                            </DateValue>
                        </DateValueContainer>
                    </DateInfo>
                </RentalPeriod>
            </Header>

            <Content>
                <Calendar
                    markedDates={markedDates}
                    onDayPress={handleChangeDate}
                />
            </Content>

            <Footer>
                <Button title="Confirmar" onPress={handleConfirmRental} />
            </Footer>

        </Container>
    )
}