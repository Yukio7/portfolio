import { Container, Heading} from '@chakra-ui/react'
import Layout from '../components/layouts/article'


const Veille  = () => (
  <Layout title="Veille Technologique">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Veille Technologique
      </Heading>
    </Container>
  </Layout>
)

export default Veille