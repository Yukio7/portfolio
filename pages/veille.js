import { Container, Divider } from "@chakra-ui/react";

import Head from "../components/Navigation/Head";
import Body from "../components/Navigation/Body";

export default function Veille() {
  return (
    <div>
      <main>
        <Container maxW="container.lg" mt={["5", "10"]}>
          <Head />
          <Divider my={10} />
          <Body />
          <Divider my={10} />
        </Container>
      </main>
    </div>
  );
}
