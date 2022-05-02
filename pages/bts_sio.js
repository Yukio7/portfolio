import { Container, Heading} from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'


const Works = () => (
  <Layout title="Le BTS SIO">
    <Container>
      <Section delay={0.1} >
      <Heading as="h3" fontSize={20} mb={4}>
        LE BTS SIO
      </Heading>
       <p>
        Le BTS SIO est un bts de merde 
       </p>

      </Section>
    </Container>
  </Layout>
)

export default Works
