import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {server} from '../index'
import {  Button, Container, /* Heading,*/ HStack, Image, Radio, RadioGroup, Text ,VStack } from '@chakra-ui/react'
import Loader from './Loader.jsx'
import Error from './Error.jsx'
import { Link } from 'react-router-dom'
const Coins = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [currency, setCurrency] = useState("INR")

  const currencySymbol = 
  currency === "INR" ? "₹":currency === "EUR" ? "€": "$"

  const changePage = (page) =>{
    setPage(page)
    setLoading(true)
  }

  const btn = new Array(123).fill(1)

  useEffect(() =>{
    const fetchCoins = async()=>{
      try {
      const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
      setCoins(data)
      setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    fetchCoins()
  }, [currency, page])
  if(error) return <Error message={"Error While Fetching data"}/>
  return (
    <Container maxW={'container.xl'}>
      {loading ? <Loader/> : <>
      <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
      <HStack spacing={'4'}>
      <Radio value={'INR'}>INR</Radio>
      <Radio value={'USD'}>USD</Radio>
      <Radio value={'EUR'}>EUR</Radio>
      </HStack>
      </RadioGroup>
      <HStack wrap={'wrap'} flexDirection={['column','row']} justifyContent={'space-evenly'} spacing={'4'}>
      {
        coins.map((i) => (
          <CoinCard id={i.id} key={i.id} name={i.name} img={i.image} symbol={i.symbol} price={i.current_price} currencySymbol={currencySymbol}/>
        ))
      }
      </HStack>
      <HStack w={'full'} overflowX={'auto'} p={'8'}>
        {
          btn.map((item , index)=>(
            <Button key={index}   onClick={()=> changePage(index + 1)}>{index + 1}</Button>
          ))
        }
      </HStack>
      </>}
    </Container>
  )
}
const CoinCard = ({ id, name, img, symbol, price , currencySymbol = "₹"}) => (
  <Link to={`/coin/${id}`}>
    <VStack
      w="52"
      h="52"
      shadow="lg"
      borderRadius="lg"
      transition="all 0.3s"
      m="4"
      justifyContent={'center'}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
        position: "relative", 
      }}
    >
      {/* <Heading
        size="sm"
        noOfLines="1"
        px="2"
        py="1"
        borderRadius="lg"
      >
        {symbol}
      </Heading> */}
      <Image
        src={img}
        w="20"
        h="20"
        objectFit="contain"
        alt={name}
        gridArea="1/1" 
      />
      <Text noOfLines="1" size="md">{name}</Text>
      <Text noOfLines="1" size="md">{price ? `${currencySymbol} ${price}`:"NA"}</Text>
    </VStack>
  </Link>
);

export default Coins
