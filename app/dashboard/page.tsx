// // ../dashboard/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { UserButton } from "@clerk/nextjs";
// import { ClerkLogo } from "../components/clerk-logo";
// import { LearnMore } from "../components/learn-more";
// import { Footer } from "../components/footer";

// import { DASHBOARD_CARDS } from "../consts/cards";
// import { DropletMenu } from "../droplet/droplet";
// import {
//   Box,
//   Button,
//   Container,
//   Flex,
//   Heading,
//   Spinner,
//   Grid,
//   GridItem,
//   useDisclosure,
//   VStack,
// } from '@chakra-ui/react';
// import axios from 'axios';

// // Define the droplet type
// interface Droplet {
//   id: string;
//   name: string;
//   region: string;
//   size_slug: string;
//   image: { slug: string };
//   status: string;
// }

// export default function DashboardPage() {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [droplets, setDroplets] = useState<Droplet[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDroplets = async () => {
//       try {
//         const response = await axios.get('/api/list-droplets');
//         setDroplets(response.data.droplets);
//       } catch (error) {
//         console.error('Error fetching droplets:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDroplets();
//   }, []);

//   return (
//     <>
//       <main className="max-w-[75rem] w-full mx-auto px-4">
//         <Flex direction="column" align="center" gap={10} pb={10}>
//           <Flex as="header" align="center" justify="space-between" w="full" h="16" gap={4}>
//             <Flex align="center" gap={4}>
//               <ClerkLogo />
//               <Box as="div" w="1px" h="6" bg="#C7C7C8" />
//             </Flex>
//             <Flex align="center" gap={4}>
//               <UserButton
//                 afterSignOutUrl="/"
//                 appearance={{
//                   elements: {
//                     userButtonAvatarBox: "size-6",
//                   },
//                 }}
//               />
//               <Button colorScheme="blue" onClick={onOpen}>
//                 Order Droplet
//               </Button>
//             </Flex>
//           </Flex>

//           {/* Centered Order Droplet Form */}
//           {isOpen && (
//             <Flex
//               position="fixed"
//               inset={0}
//               align="center"
//               justify="center"
//               bg="rgba(0, 0, 0, 0.5)"
//               zIndex={50}
//             >
//               <Box
//                 bg="white"
//                 p={6}
//                 borderRadius="lg"
//                 maxW="md"
//                 w="full"
//                 boxShadow="lg"
//               >
//                 <DropletMenu onClose={onClose} />
//               </Box>
//             </Flex>
//           )}

//           {/* Droplet List */}
//           <Container maxW="container.xl">
//             <Heading as="h2" size="lg" mb={4}>Droplet List</Heading>
//             {loading ? (
//               <Flex justify="center" align="center">
//                 <Spinner size="xl" />
//               </Flex>
//             ) : (
//               <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
//                 {droplets.map((droplet) => (
//                   <GridItem key={droplet.id} bg="white" p={6} borderRadius="md" boxShadow="md">
//                     <VStack align="start">
//                       <Heading as="h3" size="md">{droplet.name}</Heading>
//                       <Box>ID: {droplet.id}</Box>
//                       <Box>Region: {droplet.region}</Box>
//                       <Box>Size: {droplet.size_slug}</Box>
//                       <Box>Image: {droplet.image.slug}</Box>
//                       <Box>Status: {droplet.status}</Box>
//                     </VStack>
//                   </GridItem>
//                 ))}
//               </Grid>
//             )}
//           </Container>
//         </Flex>
//       </main>
//       <LearnMore cards={DASHBOARD_CARDS} />
//       <Footer />
//     </>
//   );
// }


// ../dashboard/page.tsx

'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/header';
import { Footer } from "../components/footer";

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
  const [droplets, setDroplets] = useState<Droplet[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [opsi, setOpsi] = useState(1);


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

  // Dummy data for initial droplets
  const dummyDroplets = [
    { id: '1', name: 'Droplet 1', region: 'NYC1', size_slug: 's-1vcpu-1gb', image: { slug: 'ubuntu-20-04-x64' }, status: 'active' },
    { id: '2', name: 'Droplet 2', region: 'SFO2', size_slug: 's-1vcpu-2gb', image: { slug: 'ubuntu-18-04-x64' }, status: 'active' },
  ];

  useEffect(() => {
    // Set initial dummy data
    setDroplets(dummyDroplets);
    setLoading(false);
  }, []);

  const addDummyDroplet = () => {
    setIsModalOpen(true);
  }; const addDummyDroplet1 = () => {
    setIsModalOpen1(true);
  };

  const handleAgree = () => {
    const newDroplet = {
      id: (droplets.length + 1).toString(),
      name: `Droplet ${droplets.length + 1}`,
      region: 'AMS3',
      size_slug: 's-1vcpu-2gb',
      image: { slug: 'ubuntu-20-04-x64' },
      status: 'active',
    };
    setDroplets([...droplets, newDroplet]);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalOpen1(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header balance={0} onLogout={() => { }} onTopUp={() => { }} />
      <main className="grow">
        <div className="container mx-auto mt-4">
          <div className="flex justify-between mb-4">
            <h1 className="text-lg">Droplets</h1>
            <button onClick={addDummyDroplet} className="bg-teal-500 text-white px-4 py-2 rounded">Add Droplet</button>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Region</th>
                  <th className="px-4 py-2 border">Size</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {droplets.map((droplet) => (
                  <tr key={droplet.id}>
                    <td className="px-4 py-2 border">{droplet.id}</td>
                    <td className="px-4 py-2 border">{droplet.name}</td>
                    <td className="px-4 py-2 border">{droplet.region}</td>
                    <td className="px-4 py-2 border">{droplet.size_slug}</td>
                    <td className="px-4 py-2 border">{droplet.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
      <Footer />

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-lg font-bold mb-4">TOS PENGGUNAAN DROPLET</h2>
            <div className='text-sm'>
              <p>1. Dilarang melakukan Mining berbasis CPU seperti MRIG, Minergate, dll.</p>
              <p>2. Dilarang install panel untuk kebutuhan Scam/Phising.</p>
              <p>3. Kegiatatan Hardcore seperti Scanning, PortScan, DDoS, Dump, Exploit, Hacking, dll. Wajib menggunakan VPN/SSH/Proxy (Berlaku Juga Untuk OS Linux).</p>
              <p>4. VPN Gratis bisa Daftar Disini.</p>
            </div>
            <div>
              <p className="mt-4 text-red-500 text-xs">• Pelanggaran bisa menyebabkan Server Suspend dan Droplet Mati Masal.</p>
              <p className="text-red-500  text-xs">• Bagi yang melakukan pelanggaran, akunnya akan di Banned Permanen dan Saldo Akan Hangus.</p>
              <p className="text-red-500  text-xs">• TIDAK ADA KOMPENSASI SIAPAPUN PELANGGARNYA.</p>
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={handleCancel} className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2">Batal</button>
              <button onClick={() => setIsModalOpen1(true)} className="bg-teal-500 text-white px-4 py-2 rounded">Setuju & Lanjutkan</button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen1 && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-lg font-bold mb-4">Pilih Spesifikasi</h2>
            {opsi === 1 && (
              <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-3'>
                  <div className='flex flex-col gap-1'>
                    <label htmlFor="textInput">Input Teks:</label>
                    <input type="text" id="textInput" className="border px-2 py-1" />
                  </div>

                  <div className='flex flex-row justify-between gap-2'>
                    <label htmlFor="numberInput">Angka Dropdown:</label>
                    <select id="numberInput" className="border px-2 py-1">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>

                  <div className='flex flex-col gap-1'>
                    <p>Jenis:</p>
                    <label>
                      <input type="radio" name="jenis" value="opsi1" /> Opsi 1
                    </label>
                    <label>
                      <input type="radio" name="jenis" value="opsi2" /> Opsi 2
                    </label>
                  </div>

                  <div className='flex flex-col gap-1'>
                    <label htmlFor="textarea">Textarea:</label>
                    <textarea id="textarea" className="border px-2 py-1"></textarea>
                  </div>
                </div>

                <div className=' text-xs'>
                  <p className=" text-green-500">*Spesifikasi :</p>
                  <p className=" text-red-500 ">*Harga Sebelumnya :</p>
                </div>
              </div>
            )}
            {opsi === 2 && (
              <div className='flex flex-col gap-3'>
                2
              </div>
            )}
            {opsi === 3 && (
              <div className='flex flex-col gap-3'>
                3
              </div>
            )}
            {opsi === 4 && (
              <div className='flex flex-col gap-3'>
                4
              </div>
            )}
            {opsi === 5 && (
              <div className='flex flex-col gap-3'>
                5
              </div>
            )}
            {opsi === 6 && (
              <div className='flex flex-col gap-3'>
                6
              </div>
            )}
            <div className="flex justify-end mt-4 gap-3">
              <button onClick={handleCancel} className="bg-gray-300 text-gray-700 px-4 py-2 rounded ">Batal</button>
              {opsi >= 2 && <button onClick={() => setOpsi(opsi - 1)} className="bg-teal-500 text-white px-4 py-2 rounded">Sebelumnya</button>}
              <button onClick={() => setOpsi(opsi + 1)} className="bg-teal-500 text-white px-4 py-2 rounded">Setuju & Lanjutkan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
