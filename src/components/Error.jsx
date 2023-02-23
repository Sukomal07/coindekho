import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const Error = ({message}) => {
  return (
    <Alert status='error' position={'fixed'} top={'10%'} left={['30%','70%']} w={'container.lg'}>
      <AlertIcon/>
      {message}
    </Alert>
  )
}

export default Error
