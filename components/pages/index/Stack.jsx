import ToolCard from "../../ToolCard";
import { Heading, SlideFade, Grid } from "@chakra-ui/react";
import {
  FaJava,
  FaReact,
  FaPhp,
  FaDatabase,
  FaFigma,
} from "react-icons/fa";

import Paragraph from "../../paragraph";

const tools = [
  {
    name: "TP Jeu JV Combat",
    description: "Ce TP nous a permis de mieux comprendre le fonctionnement de la programmation orientée objet, j'ai du créer un jeux vidéo permettant de créer différents personnages qui pouvait se battre entre eux. ",
    icon: <FaJava fontSize="20px" />,
    url: "https://drive.google.com/file/d/1KS39ZF1zkcoiZ-31ZWxn6WTaEwST18gf/view?usp=sharing",
  },
  {
    name: "TP ColorManager",
    description: "Ce TP consistait à créer la classe ColorManager en Java en y ajoutant les méthodes nécessaires. Les méthodes étaient ensuite testées à l'aide de tests unitaires",
    icon: <FaJava fontSize="20px" />,
    url: "https://drive.google.com/file/d/1TCpM-APXW2HDahVsQoIbBFqWppy94ztu/view?usp=sharing",
  },
  {
    name: "Mon Portfolio",
    description: "Me créer un portfolio en utilisant différents framework issus du langage Javascript en React.js, Chakra UI et Emotion.js",
    icon: <FaReact fontSize="20px" />,
    url: "https://portfolio-yukio7.vercel.app/",
  },
  {
    name: "TP ACL & Routeurs",
    description: "TP permettant de voir les solutions afin de limiter les utilisateurs dans leur utilisation d'internet en entreprise.",
    icon: <FaDatabase fontSize="20px" />,
    url: "https://drive.google.com/file/d/1Ym9sAXyMXPm2ubv28AGeiHQnngRJtCj7/view",
  },
  {
    name: "BS'Trade",
    description:
      "Site Web créé en groupe. C'est une plateforme mettant en contact des étudiants de notre école.",
    icon: <FaPhp fontSize="20px" />,
    url: "http://bstrade.alwaysdata.net/login.php",
  },
  {
    name: "Appli BS'Trade",
    description: "Application mobile créée en groupe. C'est la version mobile du site web présenté",
    icon: <FaFigma fontSize="20px" />,
    url: "https://mega.nz/file/nugQ0STD#epHBJX_fV_pWen-_9CdxdLJCov1kZRJSVXA_EZ1senQ",
  },
];

const Stack = () => {
  return (
    <SlideFade in={true} offsetY={80} delay={0.2}>
      <Heading
        as="h1"
        fontSize={{ base: "24px", md: "30px", lg: "36px" }}
        mb={3}
      >

      </Heading>
      <Paragraph fontSize="xl" lineHeight={1.6}>
        
      </Paragraph>
      <Grid
        mt={10}
        templateColumns={["1fr", "1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
        gap={5}
      >
        {tools.map((tool) => (
          <ToolCard tool={tool} key={tool?.name} />
        ))}
      </Grid>
    </SlideFade>
  );
};

export default Stack;
