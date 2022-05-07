import { Container, Divider } from "@chakra-ui/react";

import Stack from "../components/pages/index/Stack";
import Timeline from "../components/pages/index/Timeline";
import Profile from "../components/pages/index/Profile";

export default function Home() {
  return (
    <div>
      <main>
        <Container maxW="container.lg" mt={["5", "10"]}>
          <Profile />
          <Divider my={10} />
          <Stack />
          <Divider my={10} />
          <Timeline />
        </Container>
      </main>
    </div>
  );
}
