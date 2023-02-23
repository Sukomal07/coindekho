import { Button, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <HStack p={'4'} shadow={'base'} bgColor={'blackAlpha.800'} >
        <Text fontSize={['xl','2xl']}  fontWeight={'semibold'} color={'whiteAlpha.800'} >CoinDekho</Text>
        <Button variant={'unstyled'} color={'white'} pl={'3%'} pr={'2%'} >
        <Link to={'/'} >Coins</Link>
        </Button>
        <Button variant={'unstyled'} color={'white'}   >
        <Link to={'/exchange'}>Exchanges</Link>
        </Button>
        </HStack>
    )
}

export default Header
