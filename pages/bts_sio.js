import { Box } from '@chakra-ui/react'
import { Container, Heading} from '@chakra-ui/react'
import Paragraph from '../components/paragraph'

import {HStack} from '@chakra-ui/react'
import { useState } from "react";

import {
  SlideFade,
  Divider,
  Button,
  Collapse,
  LightMode,
  Tag,
} from "@chakra-ui/react";

const About = () => {
  const [show, setShow] = useState(false);

  const [matières, setCoolStuff] = useState([
    "Anglais",
    "Mathématiques",
    "Culture Générale",
    "Mathématiques Complémentaires",
    "CEJM",
    "Développement",
    "Ateliers Professionels",
    "TC7 Commun",
  ]);

  const [options1, setOptions1] = useState([
    "SLAM",
  ]);
  const [options2, setOptions2] = useState([
    "SISR",
  ]);

  const [débouchés, setNotCoolStuff] = useState([
    "Développeur informatique",
    "Technicien réseaux",
    "Administrateur réseaux",
    "Chargé(e) d’études informatiques",
    "Développeur d’applications mobiles",
    "Programmateur d’applications",
  ]);

  const handleToggle = () => setShow(!show);

  return (
    <div>
      <main>
        <Container maxW="container.lg" mt={10}>
          <SlideFade in={true} offsetY={80}>
            <Box>
              <Heading
                as="h1"
                fontSize={{ base: "28px", md: "32px", lg: "36px" }}
                mb={4}
              >
                LE BTS SIO
              </Heading>
              <Collapse in={show} startingHeight={100}>
                <Paragraph fontSize="xl" lineHeight={1.6}>
                Le Brevet de Technicien Supérieur aux Services Informatiques aux Organisations (BTS SIO), 
                s'adresse à ceux qui souhaitent se former en deux ans aux métiers d'administrateur réseau ou de développeur.
                
                 Pour par la suite intégré directement le marché du travail ou continuer des études, dans le domaine de l'informatique.
                <p>ㅤ </p>
                <p>Le BTS SIO propose deux spécialités : </p>
                <p>ㅤ </p>
                <HStack spacing='200px'>

                      <Paragraph fontSize="xl" lineHeight={1.6}>
                    {options2.map((item) => (
                      <Tag
                        size="lg"
                        colorScheme="purple"
                        key={item}
                        marginY={2}
                        marginRight={2}
                      >
                        {item}
                      </Tag>
                    ))}
                  </Paragraph>
                </HStack>

                <Box> SISR 
                Option SISR : Administration des systèmes et des réseaux : 
                le titulaire participera à l'administration des systèmes et du réseau,
                il sera capable de modifier ou d'adapter les solutions d'infrastructure ainsi que la qualité de service des équipements
                 du réseaux. Il acquiert ainsi les compétences pour concevoir une solution d'infrastructure réseau, l'installer, 
                 la tester et la déployer. L'élève apprend aussi à administrer et superviser ce réseau. L’élève est également 
                 formé à la cybersécurisation d'une infrastructure réseau, d'un système ou d'un service informatique. 
                </Box>

                <Paragraph fontSize="xl" lineHeight={1.6}>
                    {options1.map((item) => (
                      <Tag
                        size="lg"
                        colorScheme="cyan"
                        key={item}
                        marginY={2}
                        marginRight={2}
                      >
                        {item}
                      </Tag>
                    ))}
                  </Paragraph>

                <Box> SLAM 
                L’option Solutions logicielles et applications métiers forme des spécialistes des
                logiciels (rédaction d’un cahier des charges, formulation des besoins et spécifications,
                 développement, intégration au sein de la société).
                </Box>

              
                </Paragraph>
              </Collapse>
              <LightMode>
                <Button
                  size="sm"
                  onClick={handleToggle}
                  mt="1rem"
                  colorScheme="green"
                  bg="green.500"
                >
                  Show {show ? "Less" : "More"}
                </Button>
              </LightMode>
            </Box>
            <Divider my={10} />
          </SlideFade>
          <SlideFade in={true} offsetY={80} delay={0.2}>
            <Heading
              as="h1"
              fontSize={{ base: "24px", md: "30px", lg: "36px" }}
              mb={3}
            >
              Matières

            </Heading>
            <Paragraph fontSize="xl" lineHeight={1.6}>
              {matières.map((item) => (
                <Tag
                  size="lg"
                  colorScheme="green"
                  key={item}
                  marginY={2}
                  marginRight={2}
                >
                  {item}
                </Tag>
              ))}
            </Paragraph>
            <Heading
              as="h1"
              fontSize={{ base: "24px", md: "30px", lg: "36px" }}
              mt={10}
              mb={3}
            >
              Les débouchés

            </Heading>
            <Paragraph fontSize="xl" lineHeight={1.6}>
              {débouchés.map((item) => (
                <Tag
                  size="lg"
                  colorScheme="red"
                  key={item}
                  marginY={2}
                  marginRight={2}
                >
                  {item}
                </Tag>
              ))}
            </Paragraph>
          </SlideFade>
        </Container>
      </main>
    </div>
  );
};

export default About;
