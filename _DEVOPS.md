I/ Config Docker cho NextJS app

0. Definations:

- Các định nghĩa cơ bản cần nắm: https://viblo.asia/p/docker-co-ban-p1-image-va-container-m68Z0A7XlkG
- CMDs: https://tedu.com.vn/kien-thuc/cac-cau-lenh-huu-dung-trong-docker-ma-ban-can-nho-295.html

1. Tạo các file Dockerfile và docker-compose.yml

- Dockerfile bao gồm các cmd chỉ dẫn steps tạo Docker image cho source
- docker-compose.yml giúp định nghĩa, cấu hình các services hay images cần thiết sử dụng trong ứng dụng

2. Build image của ứng dụng với Docker CMD:

- docker build -t <image_name> <working_dir>

* lệnh này sẽ tìm file Dockerfile để build ra image của src
* flag -t (gắn tag name cho image)
* ex: docker build -t capstone-store-fe . (build image với tag capstone-store-fe ở thư mục root hiện tại)

3.
