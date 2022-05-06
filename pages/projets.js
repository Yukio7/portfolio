import { Box, Container, Heading, Divider, SlideFade } from "@chakra-ui/react";
import Layout from '../components/layouts/article'
import Section from '../components/section'
import Paragraph from "../components/Paragraph";
import Head from "next/head";

const Projets = () => (
  <Layout title="Le BTS SIO">
    <Container>
      <Section delay={0.1} >

      <Heading as="h3" fontSize={20} mb={4}>
        LE BTS SIO
      </Heading>
       <p> 
        Le bts sio est 
       </p>
      </Section>
      
    </Container>
  </Layout>
)
export default Projets;
