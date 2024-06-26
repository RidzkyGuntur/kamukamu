export type Region = 'nyc3' | 'sgp1';
export type Size = 's-1vcpu-1gb' | 's-2vcpu-2gb';
export type OS = 'ubuntu-20-04-x64' | 'centos-7-x64' | 'windows-11';

interface OSPrices {
  'ubuntu-20-04-x64': number;
  'centos-7-x64': number;
  'windows-11': number;
}

interface InstanceSizes {
  's-1vcpu-1gb': OSPrices;
  's-2vcpu-2gb': OSPrices;
}

interface Regions {
  'nyc3': InstanceSizes;
  'sgp1': InstanceSizes;
}

const prices: Regions = {
  'nyc3': {
    's-1vcpu-1gb': {
      'ubuntu-20-04-x64': 10000,
      'centos-7-x64': 12000,
      'windows-11': 15000
    },
    's-2vcpu-2gb': {
      'ubuntu-20-04-x64': 20000,
      'centos-7-x64': 22000,
      'windows-11': 25000
    }
  },
  'sgp1': {
    's-1vcpu-1gb': {
      'ubuntu-20-04-x64': 11000,
      'centos-7-x64': 13000,
      'windows-11': 16000
    },
    's-2vcpu-2gb': {
      'ubuntu-20-04-x64': 21000,
      'centos-7-x64': 23000,
      'windows-11': 26000
    }
  }
};

export default prices;
