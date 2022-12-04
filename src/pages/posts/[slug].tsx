import { Box, Container, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react";
import Head from "next/head";
import { RichText } from "prismic-dom";
import Posts from ".";
import { getPrismicClient } from "../../services/prismic";

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

export default function Post({ post }: PostProps) {

  console.log(post)

  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <Container
        m={0}
        p={0}
      >
      
        <Box

        >
          <Text as='h1'>{post.title}</Text>
          <time>{post.updatedAt}</time>

          <Box dangerouslySetInnerHTML={{__html: post.content}} />
        </Box>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  
  const session = await getSession({ req })
  const prismic = getPrismicClient()
  
  console.log(params?.slug)
  const response = await prismic.getByUID('publication', String(params?.slug), {})

  console.log(response.data)
  // console.log(response.data.title);
  

  const post = {
    slug: response.uid,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  

  return {
    props: {
      post,
    }
  };
};