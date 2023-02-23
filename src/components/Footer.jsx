import { Box, Button, Heading, HStack, Input, Stack, VStack, Text} from '@chakra-ui/react'
import React from 'react'
import {AiFillGithub, AiFillLinkedin, AiFillMail, AiOutlineSend} from 'react-icons/ai'
const Footer = () => {
    return (
        <Box bgColor={'blackAlpha.900'} minH={'40'} p={'8'} color={'white'}>
            <Stack direction={['column', 'row']}>
            <VStack alignItems={'stretch'} w={'full'} marginBottom={'4'}>
                <Heading size={'md'} textTransform={'uppercase'} color={'gray.600'} textAlign={['center', 'left']} >Subscribe for Updates</Heading>
                <HStack borderBottom={'2px solid white'} py={'2'}>
                    <Input placeholder='Enter email here' border={'none'} borderRadius={'none'} outline={'none'} focusBorderColor='none'/>
                    <Button p={'0'} colorScheme={'purple'} variant={'ghost'} borderRadius={'0 20px 20px 0'}>
                        <AiOutlineSend size={'20'}/>
                    </Button>
                </HStack>
            </VStack>
            <VStack w={'full'} borderLeft={['none', '1px solid white']} borderRight={['none','1px solid white']} >
            <Heading textTransform={'uppercase'} textAlign={'center'} color={'gray.600'} >
            CoinDekho
            <Text fontSize={'sm'} fontFamily={'cursive'} p={'2'} color={'gray.600'} textTransform={'capitalize'}>All rights reserved</Text>
            </Heading>
            </VStack>
            <VStack w={'full'}>
            <Heading size={'md'} textTransform={'uppercase'} color={'gray.600'} marginBottom={'3'}>social media</Heading>
            <Box display={'flex'} flexDirection={'row'}>
            <Button variant={'link'} color={'gray.400'} >
            <a href="https://www.linkedin.com/in/duttasukomal/" target={'_blank'} rel="noreferrer"><AiFillLinkedin size={'30'}/></a>
            </Button>
            <Button variant={'link'} color={'gray.400'}><a href="https://github.com/Sukomal07" target={'_blank'} rel="noreferrer"><AiFillGithub size={'30'}/></a></Button>
            <Button variant={'link'} color={'gray.400'}><a href="mailto:duttasukomal123@gmail.com" target={'_blank'} rel="noreferrer"><AiFillMail size={'30'}/></a></Button>
            </Box>
            </VStack>
            </Stack>
        </Box>
    )
}

export default Footer
