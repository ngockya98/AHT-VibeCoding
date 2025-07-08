openapi: 3.0.3
info:
  title: RM Management API
  version: 1.0.0
  description: API quản lý RM (Relation Manager)
servers:
  - url: http://localhost:3000/api

paths:
  /rms:
    post:
      summary: Tạo mới RM
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RMCreate'
      responses:
        '201':
          description: Tạo thành công
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RM'
        '400':
          description: Dữ liệu không hợp lệ
    get:
      summary: Lấy danh sách RM
      parameters:
        - in: query
          name: keyword
          schema:
            type: string
          description: Tìm kiếm theo tên, email hoặc số điện thoại
        - in: query
          name: status
          schema:
            type: string
            enum: [active, inactive]
          description: Lọc theo trạng thái
        - in: query
          name: page
          schema:
            type: integer
            default: 1
        - in: query
          name: pageSize
          schema:
            type: integer
            default: 20
      responses:
        '200':
          description: Danh sách RM
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/RM'
                  total:
                    type: integer

  /rms/{id}:
    get:
      summary: Lấy chi tiết RM
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Thông tin chi tiết RM
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RM'
        '404':
          description: Không tìm thấy RM

    patch:
      summary: Cập nhật trạng thái (active/deactivate) RM
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                status:
                  type: string
                  enum: [active, inactive]
      responses:
        '200':
          description: Cập nhật thành công
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RM'
        '404':
          description: Không tìm thấy RM

components:
  schemas:
    RMCreate:
      type: object
      required:
        - name
        - emailOrPhone
      properties:
        name:
          type: string
        emailOrPhone:
          type: string
          description: Email (đúng định dạng) hoặc số điện thoại (bắt buộc nhập 1 trong 2)
        company:
          type: string
        avatar:
          type: string
          format: uri
        password:
          type: string
          format: password
        ccid:
          type: string
    RM:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        emailOrPhone:
          type: string
        company:
          type: string
        avatar:
          type: string
          format: uri
        ccid:
          type: string
        status:
          type: string
          enum: [active, inactive]
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date