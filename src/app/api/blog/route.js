import { NextResponse } from 'next/server'

export const BLOGS_RAW = [
  {
    id: 1,
    image: 'https://cdn.tgdd.vn/News/1559665/5-1280x720.jpg',
    name: 'Cách tăng kích thước chữ, đổi font chữ trên Zalo để văn bản trở nên dễ đọc, cho cuộc trò chuyện thú vị hơn'
  },
  {
    id: 2,
    image: 'https://cdn.tgdd.vn/News/1565984/8-1280x720.jpg',
    name: 'Cách đổi tên trên Google Meet, tạo ấn tượng chuyên nghiệp với những người tham gia khác'
  },
  {
    id: 3,
    image: 'https://cdn.tgdd.vn/News/1566074/8-1280x720.jpg',
    name: 'Cách xóa Header và Footer trong Word, thêm không gian cho nội dung chính hoặc để bố cục đơn giản hơn'
  },
  {
    id: 4,
    image: 'https://cdn.tgdd.vn/News/1558755/10-1280x720.jpg',
    name: 'Cách kiểm tra dung lượng MacBook, dọn các tệp, ứng dụng và chương trình không cần thiết làm chậm máy'
  },
  {
    id: 5,
    image: 'https://cdn.tgdd.vn/News/1565758/8-1280x720.jpg',
    name: 'Ultra Retina XDR là gì? Ưu điểm của màn hình Ultra Retina XDR, cách tận dụng tối đa trên thiết bị'
  },
  {
    id: 6,
    image: 'https://cdn.tgdd.vn/News/1564621/18-1280x720.jpg',
    name: '13 ứng dụng "phù phép" cho Apple Pencil: Biến iPad thành trợ thủ đắc lực cho mọi nhu cầu'
  },
  {
    id: 7,
    image: 'https://cdn.tgdd.vn/News/1561146/1-1280x720.jpg',
    name: 'Chữ i trên Apple Watch là gì? Xuất hiện khi nào? Tìm hiểu ngay ý nghĩa của biểu tượng và cách sử dụng'
  },
  {
    id: 8,
    image: 'https://cdn.tgdd.vn/News/1559192/1-1280x720.jpg',
    name: 'AirPods 2 có chống nước không? Cần phải xử lý như thế nào khi AirPods 2 bị vô nước? Cùng tìm hiểu ngay nào!'
  },
  {
    id: 9,
    image: 'https://cdn.tgdd.vn/News/1565451/8-1280x720.jpg',
    name: 'Apple Pencil Pro có gì mới: Cảm biến lực bóp, con quay hồi chuyển, hỗ trợ tính năng Tìm'
  },
  {
    id: 10,
    image: 'https://cdn.tgdd.vn/News/1558973/21-1280x720.jpg',
    name: 'Cách kết nối chuột không dây, chuột Bluetooth với MacBook chỉ với vài thao tác nhanh và đơn giản'
  }
]

export async function GET() {
  try {
    const blogs = BLOGS_RAW
    return NextResponse.json(blogs, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
