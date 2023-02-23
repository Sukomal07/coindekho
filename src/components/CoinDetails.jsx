import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Badge, Box, Button, Container, /* Heading,*/ HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import Loader from './Loader.jsx'
import Error from './Error.jsx'
import { useParams } from 'react-router-dom'
import Chart from './Chart'
const CoinDetails = () => {
  const [coin, setCoin] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [currency, setCurrency] = useState("inr")
  const [days, setDays] = useState("24h")
  const [chartArray, setChartArray] = useState([])
  const params = useParams()
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$"
    const btn = ["24h","7d","15d","30d","60d","200d","1y","max"]

    const switchChart= (key) =>{
      switch (key) {
        case "24h":
          setDays("24h")
          setLoading(true)
          break;
        case "7d":
          setDays("7d")
          setLoading(true)
          break;
        case "15d":
          setDays("15d")
          setLoading(true)
          break;
        case "30d":
          setDays("30d")
          setLoading(true)
          break;
        case "60d":
          setDays("60d")
          setLoading(true)
          break;
        case "200d":
          setDays("200d")
          setLoading(true)
          break;
        case "1y":
          setDays("365d")
          setLoading(true)
          break;
        case "max":
          setDays("max")
          setLoading(true)
          break;
      
        default:
          setDays("24h")
          setLoading(true)
          break
      }
    }

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`)
        const { data:chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
        
        setCoin(data)
        setChartArray(chartData.prices)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    fetchCoin()
  }, [params.id,days,currency])
  if (error) return <Error message={"Error While Fetching data"} />
  return (
    <Container maxW={'container.xl'}>
      {loading ? <Loader /> : <>
        <RadioGroup value={currency} onChange={setCurrency} p={'8'} float={['none','right']}>
          <HStack spacing={'4'}>
            <Radio value={'inr'}>INR</Radio>
            <Radio value={'usd'}>USD</Radio>
            <Radio value={'eur'}>EUR</Radio>
          </HStack>
        </RadioGroup>
        <VStack spacing={'4'} alignItems={'flex-start'} p={'4'}>
          <Badge fontSize={'md'} bgColor={'blackAlpha.700'} color={'white'}>
            {`rank # ${coin.market_cap_rank}`}
          </Badge>
          <Image src={coin.image.large} w={'16'} h={'16'} objectFit={'contain'} />

          <Stat>
            <StatLabel>{coin.name}</StatLabel>
            <StatNumber>{currencySymbol} {coin.market_data.current_price[currency]}</StatNumber>
            <StatHelpText>
              <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"} />
              {coin.market_data.price_change_percentage_24h} %
            </StatHelpText>
          </Stat>
          <Custombar
            high={`${currencySymbol} ${coin.market_data.high_24h[currency]}`}
            low={`${currencySymbol} ${coin.market_data.low_24h[currency]}`} />

          <Box w={'full'} p={'4'}>
            <Item title={"Max Supply"} value={coin.market_data.max_supply} />
            <Item title={"Circculating Supply"} value={coin.market_data.circulating_supply} />
            <Item title={"Market Capital"} value={`${currencySymbol} ${coin.market_data.market_cap[currency]}`} />
            <Item title={"All Time High"} value={`${currencySymbol} ${coin.market_data.ath[currency]}`} />
            <Item title={"Date"} value={new Date(coin.market_data.ath_date[currency]).toLocaleString()} />
            <Item title={"All Time Low"} value={`${currencySymbol} ${coin.market_data.atl[currency]}`} />
            <Item title={"Date"} value={new Date(coin.market_data.atl_date[currency]).toLocaleString()} />

          </Box>
          <Text fontSize={'small'} alignSelf={'center'} opacity={'0.7'}>
            Last Update on {new Date(coin.last_updated).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}
          </Text>
        </VStack>
        <Box w={'full'} borderWidth={'1'}>
        <Chart arr={chartArray} currency={currencySymbol} days={days}/>
        </Box>
        <HStack p={'4'} overflowX={'auto'}>
        {
        btn.map((i) => (
          <Button key={i} onClick={() => switchChart(i)}>{i}</Button>
        ))
        }
        </HStack>
      </>}
    </Container>
  )
}
const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);


const Custombar = ({ high, low }) =>
(
  <VStack w={'full'}>
    <Progress colorScheme={'teal'} w={'full'} bg="red.200" bgGradient="linear(to-r, green.200, green.200 50%, red.200 50%)" />
    <HStack justifyContent={'space-between'} w={'full'}>
      <Badge children={high} colorScheme={'green'} />
      <Text fontSize={'sm'}>24H Range</Text>
      <Badge children={low} colorScheme={'red'} />
    </HStack>
  </VStack>
)


export default CoinDetails
