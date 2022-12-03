import { Button, useTheme } from "@chakra-ui/react"
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn, useSession, signOut } from 'next-auth/react'

export function SignInButton() {
  const theme = useTheme()
  const {data: session} = useSession()

  return session ? (
    <Button 
      type="button" 
      marginLeft='auto'
      height='3rem'
      borderRadius='3rem'
      background={theme.colors.gray850}
      border={0}
      padding='0 1.5rem'
      display='flex'
      alignItems='center'
      color={theme.colors.white}
      fontWeight='bold'
      sx={{
        svg: {
          width: '20px',
          height: '20px',
        },

        'svg:first-of-type': {
          marginRight: '1rem',
        },

        'svg:last-child': {
          marginLeft: '1rem',
        }
      }}
      _hover={{filter: 'brightness(0.8)'}}
      transition='filter 0.2s'

      onClick={() => signOut()}
    >
      <FaGithub color="#04d361"/>
      {session.user?.name}
      <FiX color='#737380' />
    </Button>
  ) : (
    <Button 
      type="button" 
      marginLeft='auto'
      height='3rem'
      borderRadius='3rem'
      background={theme.colors.gray850}
      border={0}
      padding='0 1.5rem'
      display='flex'
      alignItems='center'
      color={theme.colors.white}
      fontWeight='bold'
      sx={{
        svg: {
          width: '20px',
          height: '20px',
        },

        'svg:first-child': {
          marginRight: '1rem',
        }
      }}
      _hover={{filter: 'brightness(0.8)'}}
      transition='filter 0.2s'

      onClick={() => signIn('github')}
    >
      <FaGithub color="#eba417"/>
      Sign in with Github
      
    </Button>
  )
}