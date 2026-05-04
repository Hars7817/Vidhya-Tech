import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json({ data: services });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, icon, image, order } = await req.json();

    const service = await prisma.service.create({
      data: {
        title,
        description,
        icon: icon || null,
        image: image || null,
        order: order || 0,
      },
    });

    return NextResponse.json({ success: true, data: service });
  } catch {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, title, description, icon, image, order } = await req.json();

    const service = await prisma.service.update({
      where: { id },
      data: { title, description, icon, image, order },
    });

    return NextResponse.json({ success: true, data: service });
  } catch {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
