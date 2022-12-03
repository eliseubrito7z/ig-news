import { Box, Container, HStack, Text, useTheme } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import logoImage from "../public/images/logo.svg"
import { SignInButton } from './SigInButton'

export function Header() {
  const theme = useTheme()

  return (
    <Container 
    as="header" 
    height='5rem' 
    borderBottom={`1px solid ${theme.colors.gray800}`}
    width='100%'
    maxW='100vw'
  >
    <Box 
      maxW='1120px'
      height='5rem'
      margin='0 auto'
      p='0 2rem'

      display='flex'
      alignItems='center'
    >
      <Image src={logoImage} alt="" width={108} height={30} />
      <HStack marginLeft='5rem' height='5rem'>
        <Link href='/' >
          <Text 
            variant='headerLink' 
            _after={{ 
              content: '""',
              height: '3px',
              borderRadius: '3px 3px 0 0',
              width: '100%',
              position: 'absolute',
              bottom: '1px',
              left: 0,
              background: '#eba417',
              }}
          >
            Home
          </Text>
        </Link>

        <Link href='/post'>
          <Text variant='headerLink'>Posts</Text>
        </Link>
      </HStack>
      <SignInButton />
    </Box>
  </Container>
  );
}