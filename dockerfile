# # ใช้ image ของ Node.js ที่เป็น official
# FROM node:20

# # กำหนด working directory
# WORKDIR /src

# # คัดลอก package.json และ package-lock.json
# COPY package*.json ./

# # ติดตั้ง dependencies
# RUN npm install

# # คัดลอกไฟล์อื่นๆ ของแอพ
# COPY . .

# # เปิด port ที่ต้องการ
# EXPOSE 5174

# # เรียกใช้งาน React app (หรือคำสั่งที่เหมาะสมกับโปรเจ็คของคุณ)
# CMD ["npm", "run", "dev", "--", "--host"]

