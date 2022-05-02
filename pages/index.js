import NextLink from 'next/link'
import {
  Container,
  Heading,
  Box,
  Image,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import Layout from '../components/layouts/article'
import Section from '../components/section'


const Home = () => (
  <Layout>
    <Container>
      <Box
        borderRadius="lg"
        mb={6}
        p={3}
        textAlign="center"
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
      >
        Manhaudier Arthur | Etudiant en BTS SIO option SLAM
      </Box>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Arthur Manhaudier 
          </Heading>
          <p>Etudiant en développement ( React Enjoyer )</p>
        </Box>
        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          textAlign="center"
        >
          <Image
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            maxWidth="100px"
            display="inline-block"
            borderRadius="full"
            src="/images/arthur.jpg"
            alt="Profile image"
          />
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          CV
        </Heading>
        
          <Paragraph>
          <center><embed src="CV_Arthur.pdf" width="800" height="800" textAlign="center" type='application/pdf'/></center>
          </Paragraph>

        <Box align="center" my={4}>
          <NextLink href="https://drive.google.com/file/d/109V4fM52CKVFB5lHbOwnBW5SEOogMdGv/view?usp=sharing">
            <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
              Autre lien
            </Button>
          </NextLink>
        </Box>
      </Section>

      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Tableau de synthèse
        </Heading>

        <Paragraph> 
        <center><embed src="e4-tab-synthese.pdf"
        width="800" height="800" type='application/pdf'/></center>
        </Paragraph>
        
      </Section>

        <Box align="center" my={4}>
          <NextLink href="">
            <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
              
            </Button>
          </NextLink>
        </Box>
    </Container>
  </Layout>
)

export default Home
