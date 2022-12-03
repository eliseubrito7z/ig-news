import {extendTheme} from '@chakra-ui/react'

export const defaultTheme = extendTheme({
  styles: {
    global: () => ({
      body: {
        backgroundColor: '#121214',
        color: '#FFFFFF',
      },
      'body, input, textarea, select, button': {
        font: "400 1rem 'Roboto', sans-serif",
      },
      button: {
        cursor: "pointer",
      },
      "@media ('max-width: 1080px')": {
        html: {
          fontSize: '93.75%',
        }
      },
      "@media ('max-width: 720px')": {
        html: {
          fontSize: '87.5%',
        }
      },
    }),
  },
  colors: {
    white: '#FFFFFF',

    gray100: '#e1e1e6',
    gray300: '#a8a8b3',
    gray800: '#29292e',
    gray850: '#1f2729',
    gray900: '#121214',

    cyan500: '#61dafb',
    yellow500: '#eba417',
  },
  components: {
    Text: {
      variants: {
        headerLink: {
          display: 'inline-block',
          position: 'relative',
          padding: '0.5rem',
          height: '5rem',
          lineHeight: '5rem',
          color: '#a8a8b3',

          transition: 'color 0.2s',

          '&:hover': {
            color: '#FFFFFF'
          },

          '&.active': {
            color: '#yellow'
          },
        },
        'span-home': {
          fontSize: '1.5rem',
          fontWeight: 'bold',
        },
        'h1-home': {
          fontSize: '4.5rem',
          fontWeight: '900',
          lineHeight: '4.5rem',
          marginTop: '2.5rem',

          strong: {
            color: '#61dafb'
          }
        },
        'p-home': {
          fontSize: '1.5rem',
          lineHeight: '2.25rem',
          marginTop: '1.5rem',

          span: {
            color: '#61dafb',
            fontWeight: 'bold',
          }
        }
      },
      
    }
  }
})