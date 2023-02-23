import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {server} from '../index'
import { Button, Container, Heading, HStack, Image, Text ,VStack } from '@chakra-ui/react'
import Loader from './Loader.jsx'
import Error from './Error.jsx'
const Exchanges = () => {
  const [exchanges, setExchanges] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)

  const changePage = (page) =>{
    setPage(page)
    setLoading(true)
  }
  const btn = new Array(6).fill(1)
  useEffect(() =>{
    const fetchExchanges = async()=>{
      try {
      const {data} = await axios.get(`${server}/exchanges?page=${page}`)
      console.log(data)
      setExchanges(data)
      setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    fetchExchanges()
  }, [page])
  if(error) return <Error message={"Error While Fetching data"}/>
  return (
    <Container maxW={'container.xl'}>
      {loading ? <Loader/> : <>
      
      <HStack wrap={'wrap'} flexDirection={['column','row']} justifyContent={'space-around'} spacing={'4'}>
      {
        exchanges.map((i) => (
          <ExchangeCard key={i.id} name={i.name} img={i.image} rank={i.trust_score_rank}  url={i.url}/>
        ))
      }
      </HStack>
      
      <HStack w={'full'} justifyContent={'center'} p={'8'}>
        {
          btn.map((item , index)=>(
            <Button bgColor={'blackAlpha.900'} color={'white'} onClick={()=> changePage(index + 1)}>{index + 1}</Button>
          ))
        }
      </HStack>
      </>}
    </Container>
  )
}
const ExchangeCard = ({ name, img, rank,  url }) => (
  <a href={url} target="blank">
    <VStack
      w="52"
      h="40"
      shadow="lg"
      borderRadius="lg"
      transition="all 0.3s"
      m="4"
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
        position: "relative", 
      }}
    >
      <Heading
        size="sm"
        noOfLines="1"
        position="absolute" 
        top="2"
        left="2"
        // bg="whiteAlpha.800"
        // color=''
        px="2"
        py="1"
        borderRadius="lg"
      >
        {rank}
      </Heading>
      <Image
        src={img}
        w="20"
        h="20"
        objectFit="contain"
        alt={name}
        gridArea="1/1" 
      />
      <Text noOfLines="1" size="md">{name}</Text>
    </VStack>
  </a>
);

export default Exchanges
