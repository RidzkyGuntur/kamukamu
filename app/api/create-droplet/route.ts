// app/api/create-droplet/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const DIGITALOCEAN_API_URL = 'https://api.digitalocean.com/v2/droplets';
const DIGITALOCEAN_API_TOKEN = process.env.DIGITALOCEAN_API_TOKEN;

export async function POST(req: NextRequest) {
  const { name, region, size, image } = await req.json();

  if (!DIGITALOCEAN_API_TOKEN) {
    return NextResponse.json({ error: 'DigitalOcean API token is not set' }, { status: 500 });
  }

  try {
    const response = await axios.post(DIGITALOCEAN_API_URL, {
      name,
      region,
      size,
      image,
    }, {
      headers: {
        'Authorization': `Bearer ${DIGITALOCEAN_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json({ droplet: response.data.droplet }, { status: 200 });
  } catch (error) {
    console.error('Error creating droplet:', error);
    return NextResponse.json({ error: 'Failed to create droplet' }, { status: 500 });
  }
}
