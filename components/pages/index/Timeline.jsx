import { Heading, SlideFade, List, ListItem, ListIcon, Link, Box } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import { Paragraph } from "./Paragraph";
import { FaRegFilePdf } from "react-icons/fa";
import {LightMode,Button,ButtonGroup} from "@chakra-ui/react";

const Timeline = () => {
  return (
    <SlideFade in={true} offsetY={80} delay={0.2}>
    <Heading
        as="h1"
        fontSize={{ base: "24px", md: "30px", lg: "36px" }}
        mb={3}
      >
        Parcours professionel  
      
      </Heading>

      <Paragraph>
      Le BTS Services Informatiques aux Organisations offre la possibilité d'effectuer 2 stages en entreprise durant le cursus.
      La durée des stages est de 10 semaines, à effectuer au cours des deux années de formation,
      avec nécessairement une période de quatre à cinq semaines consécutives en fin de première année 
      et une période de cinq à six semaines consécutives en deuxième année.
      </Paragraph>

      <Heading mt={10} mb={5} as="h2" size="md">
        Janvier/Février 2022
      </Heading>
      <List spacing={18} fontSize="18">
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Stage de 6 semaines au <Link href="http://www.ch-le-vinatier.fr/">Vinatier</Link>
          <p>ㅤ </p>
          <Paragraph>
          Mon projet consistait à étudier et analyser le développement logiciel, de l'
            ’application de Visio/télémédecine au
            Centre Hospitalier Le 
            Vinatier
          </Paragraph>

          <Box mt={10}>
          <LightMode>
            <ButtonGroup>
              <Button
                colorScheme="blue"
                bg="blue.500"
                href="https://drive.google.com/file/d/1ijVxwoEpIE5xGKcE-8h4CYnI2h0pur8W/view?usp=sharing"
                borderRadius={5}
                p={3}
                as="a"
                leftIcon={<FaRegFilePdf />}
              >
                Convention de stage 
              </Button>
              <Button
                colorScheme="blue"
                bg="blue.500"
                href="https://drive.google.com/file/d/1UCF9w0asN9FjWKjzEgMs8c5ENxBqY7Up/view?usp=sharing"
                borderRadius={5}
                p={3}
                as="a"
                leftIcon={<FaRegFilePdf />}
              >
               Rapport de stage
              </Button>
            </ButtonGroup>
          </LightMode>
        </Box>

        </ListItem>
      </List>
      <Heading mt={10} mb={5} as="h2" size="md">
        Mai/Juin 2021
      </Heading>
      <List spacing={18} fontSize="18">
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Stage de 5 semaines au <Link href="http://www.ch-le-vinatier.fr/">Vinatier</Link>
          <p>ㅤ </p>
          <Paragraph>
          Mon projet consistait à étudier et concevoir une base de données pour 
le logiciel de blanchisserie

          </Paragraph>
          <Box mt={10}>
          <LightMode>
            <ButtonGroup>
              <Button
                colorScheme="green"
                bg="green.500"
                href="https://drive.google.com/file/d/1eCA93lv2B5NgzaiNc5K9ufAiJ5CRIk0l/view?usp=sharing"
                borderRadius={5}
                p={3}
                as="a"
                leftIcon={<FaRegFilePdf />}
              >
                Convention de stage 
              </Button>
              <Button
                colorScheme="green"
                bg="green.500"
                href="https://drive.google.com/file/d/1HT2MoghJMT4DpiQCOhiAmxO-MSuwGCLg/view?usp=sharing"
                borderRadius={5}
                p={3}
                as="a"
                leftIcon={<FaRegFilePdf />}
              >
               Rapport de stage
              </Button>
            </ButtonGroup>
          </LightMode>
        </Box>
        </ListItem>
        <p>ㅤ </p>
        <p>ㅤ </p>
      </List>
    </SlideFade>
  );
};

export default Timeline;
