import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const portfolios = await prisma.portfolio.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json({ data: portfolios });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch portfolios' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, image, link, category, order } = await req.json();

    const portfolio = await prisma.portfolio.create({
      data: {
        title,
        description,
        image,
        link: link || null,
        category,
        order: order || 0,
      },
    });

    return NextResponse.json({ success: true, data: portfolio });
  } catch {
    return NextResponse.json({ error: 'Failed to create portfolio' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, title, description, image, link, category, order } = await req.json();

    const portfolio = await prisma.portfolio.update({
      where: { id },
      data: { title, description, image, link, category, order },
    });

    return NextResponse.json({ success: true, data: portfolio });
  } catch {
    return NextResponse.json({ error: 'Failed to update portfolio' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    await prisma.portfolio.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete portfolio' }, { status: 500 });
  }
}
