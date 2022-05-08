import { Heading, SlideFade, Box } from "@chakra-ui/react";
import NextLink from 'next/link'
import Paragraph from "../paragraph";
import {Button} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

const Body = () => {
    return (
      <SlideFade in={true} offsetY={80} delay={0.2}>
        <Heading
          as="h1"
          fontSize={{ base: "24px", md: "30px", lg: "36px" }}
          mb={3}
        >
          Qu'est ce qu'une veille technologique ?  
        
        </Heading>
  
        <Paragraph>
        <p>ㅤ </p>
        La veille technologique, élément de la veille stratégique, consiste à surveiller les évolutions techniques, 
        les innovations dans un secteur d’activité donné. La veille technologique comprend notamment la surveillance, la collecte, 
        le partage et la diffusion d’informations permettant d’anticiper ou de s’informer sur des changements en matière de recherche, 
        développement, brevet, lancement de nouveaux produits, matériaux, 
        processus, concepts, innovation de fabrication, etc…. Cela a pour but d’évaluer l’impact sur l’environnement et l’organisation.
        </Paragraph>

          
        <p>ㅤ </p>
        <p>ㅤ </p>

        <Box align="center" my={4}>
          <NextLink href="https://docs.google.com/presentation/d/1KEzsmHQ41maJabmqRFmUc5N5C6em8VqKoWDeGrF7Vn4/edit?usp=sharing">
            <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
              Lien de ma veille
            </Button>
          </NextLink>
        </Box>
  
          <p>ㅤ </p>
          <p>ㅤ </p>
      </SlideFade>
    );
  };
  
  export default Body;
  