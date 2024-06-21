import { NextResponse } from 'next/server'

export const BANNERS_RAW = [
  {
    id: 1,
    image:
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_1920x533/https://cdn.tgdd.vn/2024/04/banner/Mac-Air-2880-800-1920x533.png'
  },
  {
    id: 2,
    image:
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_1920x533/https://cdn.tgdd.vn/2024/04/banner/Upgrade-iPhone-2880-800-1920x533.png'
  },
  {
    id: 3,
    image:
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_1920x533/https://cdn.tgdd.vn/2024/04/banner/MacBook-chung-2880-800-1920x533-3.png'
  },
  {
    id: 4,
    image:
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_1920x533/https://cdn.tgdd.vn/2024/04/banner/iPad-9-2880-800-1920x533-1.png'
  },
  {
    id: 5,
    image:
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_1920x533/https://cdn.tgdd.vn/2024/04/banner/AWSE-2880-800-1920x533.png'
  },
  {
    id: 6,
    image:
      'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_1920x533/https://cdn.tgdd.vn/2024/04/banner/2880-800-1920x533-1.png'
  }
]

export async function GET() {
  try {
    const banners = BANNERS_RAW
    return NextResponse.json(banners, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
