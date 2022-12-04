import { Box, Container, HStack, Text, useTheme } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import logoImage from "../public/images/logo.svg"
import { SignInButton } from './SigInButton'
import { useRouter } from 'next/router'
import { ActiveLink } from './ActiveLink'

export function Header() {
  const theme = useTheme()
  const { asPath } = useRouter()

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
        <ActiveLink href='/' >
          <Text
            variant='headerLink' 
            _after={{}}
          >
            Home
          </Text>
        </ActiveLink>

        <ActiveLink href='/posts' prefetch>
          <Text variant='headerLink'>Posts</Text>
        </ActiveLink>
      </HStack>
      <SignInButton />
    </Box>
  </Container>
  );
}