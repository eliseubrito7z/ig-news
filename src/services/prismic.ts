import * as Prismic from "@prismicio/client";
import fetch from 'node-fetch'

export function getPrismicClient() {
  const endpoint = Prismic.getEndpoint('ignews-ignite03')
  const client = Prismic.createClient(endpoint, {
    fetch, accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  })

  return client
}