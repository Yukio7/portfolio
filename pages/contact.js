import { Container, Heading} from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'


const Contact = () => (
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

export default Contact 