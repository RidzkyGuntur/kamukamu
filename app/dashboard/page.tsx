// ../dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { UserButton } from "@clerk/nextjs";
import { ClerkLogo } from "../components/clerk-logo";
import { LearnMore } from "../components/learn-more";
import { Footer } from "../components/footer";
import { DASHBOARD_CARDS } from "../consts/cards";
import { DropletMenu } from "../droplet/droplet";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spinner,
  Grid,
  GridItem,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';

// Define the droplet type
interface Droplet {
  id: string;
  name: string;
  region: string;
  size_slug: string;
  image: { slug: string };
  status: string;
}

export default function DashboardPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [droplets, setDroplets] = useState<Droplet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDroplets = async () => {
      try {
        const response = await axios.get('/api/list-droplets');
        setDroplets(response.data.droplets);
      } catch (error) {
        console.error('Error fetching droplets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDroplets();
  }, []);

  return (
    <>
      <main className="max-w-[75rem] w-full mx-auto px-4">
        <Flex direction="column" align="center" gap={10} pb={10}>
          <Flex as="header" align="center" justify="space-between" w="full" h="16" gap={4}>
            <Flex align="center" gap={4}>
              <ClerkLogo />
              <Box as="div" w="1px" h="6" bg="#C7C7C8" />
            </Flex>
            <Flex align="center" gap={4}>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "size-6",
                  },
                }}
              />
              <Button colorScheme="blue" onClick={onOpen}>
                Order Droplet
              </Button>
            </Flex>
          </Flex>

          {/* Centered Order Droplet Form */}
          {isOpen && (
            <Flex
              position="fixed"
              inset={0}
              align="center"
              justify="center"
              bg="rgba(0, 0, 0, 0.5)"
              zIndex={50}
            >
              <Box
                bg="white"
                p={6}
                borderRadius="lg"
                maxW="md"
                w="full"
                boxShadow="lg"
              >
                <DropletMenu onClose={onClose} />
              </Box>
            </Flex>
          )}
          
          {/* Droplet List */}
          <Container maxW="container.xl">
            <Heading as="h2" size="lg" mb={4}>Droplet List</Heading>
            {loading ? (
              <Flex justify="center" align="center">
                <Spinner size="xl" />
              </Flex>
            ) : (
              <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
                {droplets.map((droplet) => (
                  <GridItem key={droplet.id} bg="white" p={6} borderRadius="md" boxShadow="md">
                    <VStack align="start">
                      <Heading as="h3" size="md">{droplet.name}</Heading>
                      <Box>ID: {droplet.id}</Box>
                      <Box>Region: {droplet.region}</Box>
                      <Box>Size: {droplet.size_slug}</Box>
                      <Box>Image: {droplet.image.slug}</Box>
                      <Box>Status: {droplet.status}</Box>
                    </VStack>
                  </GridItem>
                ))}
              </Grid>
            )}
          </Container>
        </Flex>
      </main>
      <LearnMore cards={DASHBOARD_CARDS} />
      <Footer />
    </>
  );
}
