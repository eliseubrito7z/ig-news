import { Button, useTheme } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { signIn, useSession } from "next-auth/react";
import { api } from "../services/axios";
import { getStripeJs } from "../services/stripe-js";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const theme = useTheme()
  const {data: session} = useSession()

  async function handleSubscribe() {
    if (!session) {
      signIn('github')
      return;
    }

    // create checkout session

    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data

      const stripe = await getStripeJs()

      await stripe?.redirectToCheckout({sessionId})
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <Button 
      w={260}
      h='4rem'
      border={0}
      borderRadius='2rem'
      bg={theme.colors.yellow500}
      color={theme.colors.gray900}
      fontSize='1.25rem'
      fontWeight='bold'
      display='flex'
      alignItems='center'
      justifyContent='center'

      transition='filter 0.2s'
      _hover={{
        filter: 'brightness(0.8)'
      }}

      marginTop='2.5rem'

      onClick={handleSubscribe}
    >
      Subscribe Now
    </Button>
  )
}
