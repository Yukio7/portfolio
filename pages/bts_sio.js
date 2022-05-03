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
        Le Brevet de Technicien Supérieur Services Informatiques aux Organisations (BTS SIO) est un diplôme reconnu par l’état de niveau Bac+2. Il associe aux enseignements théoriques et professionnels, deux stages en entreprises (10 à 11 semaines réparties sur les deux années d’études).

En plus des matières en lien avec l’ingénierie informatique, la formation propose également des enseignements de culture générale, d’anglais, de mathématiques appliquées à l’informatique, ainsi que sur les outils d’analyse économique, managériale et juridique des services informatiques.
       </p>

      </Section>
    </Container>
  </Layout>
)

export default Works
