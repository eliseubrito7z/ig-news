import { Box, Container, Text } from "@chakra-ui/react"
import { GetServerSideProps, GetStaticProps } from "next"
import Image from "next/image"
import { SubscribeButton } from "../components/SubscribeButton"
import { stripe } from "../services/stripe"
import girlImage from "../public/images/avatar.svg"

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>

      <Container 
        maxW='1120px' 
        margin='0 auto' 
        padding='0 2rem'
        height='calc(100vh - 5rem)'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
      >
        <Box maxW='600px'>
          <Text as='span' variant='span-home'>👏 Hey, welcome</Text>
          <Text as='h1' variant='h1-home'>
            New about the <strong>React</strong> world.
          </Text>
          <Text as='p' variant='p-home' >
            Get access to all publicashions <br />
            <span>for {product.amount} month</span>
          </Text>
          <SubscribeButton priceId={product.priceId} /> 
        </Box>

        <Image alt="" src={girlImage}/>
      </Container>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {

  const price = await stripe.prices.retrieve('price_1M8QelBXifr0D2T0RqHal4jw')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Number(price.unit_amount) / 100),
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}