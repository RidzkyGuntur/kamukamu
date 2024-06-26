// ../droplet/droplet.tsx

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Box, Button, Container, FormControl, FormLabel, Input, Heading, Select, useToast, VStack, Text } from '@chakra-ui/react';
import prices, { Region, Size, OS } from '../utils/prices';

interface DropletMenuProps {
  onClose: () => void;
}

interface FormData {
  name: string;
  region: Region;
  size: Size;
  image: OS;
  duration: number;
  amount: number;
}

export const DropletMenu: React.FC<DropletMenuProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    region: 'nyc3',
    size: 's-1vcpu-1gb',
    image: 'ubuntu-20-04-x64',
    duration: 1,
    amount: 0,
  });

  const toast = useToast();

  useEffect(() => {
    const { region, size, image, duration } = formData;
    const baseAmount = prices[region][size][image];
    const amount = baseAmount * duration;
    setFormData(prevFormData => ({ ...prevFormData, amount }));
  }, [formData.region, formData.size, formData.image, formData.duration]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    try {
      const response = await axios.post('/api/create-droplet', formData); // Notice the leading slash
      toast({
        title: 'Droplet created.',
        description: `Droplet ID: ${response.data.droplet.id}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error('Failed to create droplet:', error);
      toast({
        title: 'Error.',
        description: 'Failed to create droplet.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py={20}>
      <Heading as="h1" mb={80}>Sewa RDP (per hari)</Heading>
      <Box p={70} borderWidth={1} borderRadius="md" boxShadow="lg">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Droplet Name</FormLabel>
              <Input type="text" name="name" onChange={handleChange} />
            </FormControl>
            <FormControl id="region" isRequired>
              <FormLabel>Region</FormLabel>
              <Select name="region" onChange={handleChange} value={formData.region}>
                <option value="nyc3">New York (nyc3)</option>
                <option value="sgp1">Singapore (sgp1)</option>
              </Select>
            </FormControl>
            <FormControl id="size" isRequired>
              <FormLabel>Size</FormLabel>
              <Select name="size" onChange={handleChange} value={formData.size}>
                <option value="s-1vcpu-1gb">1 vCPU, 1 GB RAM</option>
                <option value="s-2vcpu-2gb">2 vCPU, 2 GB RAM</option>
              </Select>
            </FormControl>
            <FormControl id="image" isRequired>
              <FormLabel>Image</FormLabel>
              <Select name="image" onChange={handleChange} value={formData.image}>
                <option value="ubuntu-20-04-x64">Ubuntu 20.04</option>
                <option value="centos-7-x64">CentOS 7</option>
                <option value="windows-11">Windows 11</option>
              </Select>
            </FormControl>
            <FormControl id="duration" isRequired>
              <FormLabel>Duration (hari)</FormLabel>
              <Input type="number" name="duration" onChange={handleChange} value={formData.duration} min="1" />
            </FormControl>
            <Box>
              <Text>Price: IDR {formData.amount}</Text>
            </Box>
            <Button type="submit" colorScheme="teal" size="lg" w="full">
              Create Droplet
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};
