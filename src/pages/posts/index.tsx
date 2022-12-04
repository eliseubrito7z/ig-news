import { Box, Container, Link, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { getPrismicClient } from "../../services/prismic";
import { RichText } from 'prismic-dom'

import * as Prismic from '@prismicio/client'

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}


interface PostProps {
  posts: Post[]
};

export default function Posts({ posts }: PostProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <Container 
        m={0}
        p={0}
        maxW={1120}
        margin='0 auto'
        padding='0 2rem'
      >
        <Box
          m={0}
          p={0}
          maxW={720}
          margin='5rem auto 0 '
        >
          { posts.map((post) => (
            <Link key={post.slug} variant='postLink' href={`/posts/${post.slug}`} style={{ textDecoration: 'none' }}>
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <Text variant='postText'>{post.excerpt}</Text>
            </Link>
          ))}
          </Box>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()
  
  const response = await prismic.get({
    predicates: [Prismic.predicate.at('document.type', 'publication')],
    fetch: ['publication.title', 'publication.content'],
    pageSize: 100,
  })

  const posts = response.results.map(post => {
    
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find((content: any) => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    };
  });

  console.log(response)
  

  return {
    props: {
      posts
    }
  }
}