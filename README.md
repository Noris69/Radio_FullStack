# **RadioAds Platform**

A full-stack **radio advertising booking platform** designed to manage radio ad reservations, audio advertisements, packages, time slots, users, payments, and campaign publication status.

The project is composed of:

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS

This platform allows advertisers to create advertising requests, upload audio files, select packages and time slots, and follow the status of their reservations. Administrators can manage users, packages, time slots, reservations, payments, and advertisement publication.

---

# **Project Purpose**

The goal of this project is to provide a complete digital solution for managing **radio advertising campaigns**.

Instead of handling radio advertising reservations manually, this application provides a centralized platform where:

- **Advertisers** can submit radio ad requests.
- **Administrators** can manage reservations and users.
- **Audio files** can be uploaded and linked to reservations.
- **Advertising packages** can be created and managed.
- **Time slots** can be reserved.
- **Payments and publication statuses** can be tracked.

This project can be used as a foundation for:

- **Radio advertising platforms**
- **Audio campaign booking systems**
- **Media agency management tools**
- **Radio station reservation systems**
- **Advertisement scheduling applications**
- **Admin dashboards for media companies**

---

# **Technologies Used**

## **Frontend**

- **Next.js 14**
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Axios**
- **Firebase**
- **NextAuth**
- **React Calendar**
- **React H5 Audio Player**
- **React Toastify**
- **Notistack**
- **Builder.io SDK**

## **Backend**

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT Authentication**
- **bcryptjs**
- **Multer**
- **fluent-ffmpeg**
- **CORS**
- **Netlify CLI**

---

# **Project Structure**

```bash
Radio_FullStack/
├── Radio_ads_app1/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── adController.js
│   │   ├── packageController.js
│   │   ├── paymentController.js
│   │   ├── reservationController.js
│   │   ├── slotController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── authRole.js
│   │   └── uploadMiddleware.js
│   │
│   ├── models/
│   │   ├── Ad.js
│   │   ├── Package.js
│   │   ├── Payment.js
│   │   ├── Reservation.js
│   │   ├── Slot.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── adRoutes.js
│   │   ├── packageRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── reservationRoutes.js
│   │   ├── slotRoutes.js
│   │   └── userRoute.js
│   │
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── builder-app1/
    ├── public/
    ├── src/
    │   └── app/
    │       ├── components/
    │       ├── context/
    │       ├── Order/
    │       ├── OrderDetails/
    │       ├── OrderList/
    │       ├── PackageList/
    │       ├── ProductList/
    │       ├── Profile/
    │       ├── Messages/
    │       ├── SendMessage/
    │       └── UserList/
    │
    ├── package.json
    ├── tailwind.config.ts
    └── tsconfig.json
```

---

# **Main Features**

## **User Management**

- **User registration**
- **User login**
- **JWT authentication**
- **User roles**
- **Admin role**
- **Advertiser role**
- **Profile management**
- **Profile picture support**

---

## **Advertisement Management**

- **Create advertisements**
- **Upload audio advertisements**
- **Store audio files**
- **Manage ad information**
- **Track ad duration**
- **Follow publication status**

---

## **Reservation Management**

- **Create radio ad reservations**
- **Select advertising packages**
- **Choose available time slots**
- **Attach audio files to reservations**
- **Track reservation status**
- **Track payment status**
- **Track publication status**

---

## **Package Management**

- **Create advertising packages**
- **Manage package cost**
- **Manage number of ad spots**
- **Manage ad length**
- **Manage campaign duration**

---

## **Time Slot Management**

- **Create time slots**
- **Manage available slots**
- **Reserve slots**
- **Confirm selected slots**
- **Admin time slot dashboard**

---

## **Payment Management**

- **Create payment records**
- **Track payment status**
- **Link payments to reservations**
- **Admin payment follow-up**

---

## **Messaging System**

- **Message list**
- **Message composer**
- **User communication interface**
- **Chat-style UI components**

---

# **System Roles**

## **Administrator**

The administrator can:

- **Manage users**
- **Manage reservations**
- **Manage radio packages**
- **Manage time slots**
- **Manage payments**
- **View reservation details**
- **Update publication status**
- **Access admin dashboards**

---

## **Advertiser**

The advertiser can:

- **Create an account**
- **Log in**
- **Submit an advertisement request**
- **Upload audio files**
- **Choose a package**
- **Select available time slots**
- **View personal reservations**
- **Manage profile information**
- **Send messages**

---

# **Backend API Routes**

The backend exposes the following main route groups:

| Route | Description |
|---|---|
| **/api/users** | User authentication and user management |
| **/api/ads** | Advertisement management |
| **/api/reservations** | Reservation management |
| **/api/payments** | Payment management |
| **/api/slots** | Time slot management |
| **/api/packages** | Advertising package management |
| **/uploads** | Static access to uploaded files |

---

# **Frontend Pages**

The frontend includes several pages and dashboards:

| Page | Description |
|---|---|
| **/login** | User login page |
| **/Order** | Advertisement order form |
| **/OrderDetails** | Order details page |
| **/OrderList** | Admin order list |
| **/CommandeUser** | User reservation/order page |
| **/CommandeDetails** | Admin reservation details |
| **/PackageList** | Admin package management |
| **/ProductList** | Admin time slot or product list management |
| **/Profile** | Admin profile page |
| **/ProfileUser** | User profile page |
| **/Messages** | Message list |
| **/SendMessage** | Send message page |
| **/UserList** | Admin user management |

---

# **Database Models**

## **User**

Represents an application user.

Main fields:

- **username**
- **email**
- **password**
- **role**
- **phone**
- **profilePic**
- **created_at**

Roles:

```text
admin
annonceur
```

---

## **Reservation**

Represents a radio advertisement reservation.

Main fields:

- **user_id**
- **slots**
- **package**
- **adname**
- **addomaine**
- **totalPrice**
- **status**
- **paymentStatus**
- **isPublished**
- **audioFile**
- **audioDuration**
- **created_at**

---

## **Package**

Represents a radio advertising package.

Typical package information includes:

- **name**
- **cost**
- **ad spots**
- **ad length**
- **duration**

---

## **Slot**

Represents an available radio advertising time slot.

Used to manage scheduling and reservation availability.

---

## **Payment**

Represents payment information linked to reservations.

---

## **Ad**

Represents advertisement-related information.

---

# **Installation**

## **1. Clone the Repository**

```bash
git clone https://github.com/Noris69/Radio_FullStack.git
cd Radio_FullStack
```

---

# **Backend Setup**

## **1. Go to the backend folder**

```bash
cd Radio_ads_app1
```

## **2. Install dependencies**

```bash
npm install
```

## **3. Create environment variables**

Create a `.env` file inside `Radio_ads_app1`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/radio_ads
JWT_SECRET=your_jwt_secret
```

## **4. Run the backend**

```bash
npm start
```

If you use Nodemon:

```bash
npx nodemon server.js
```

The backend will run by default on:

```bash
http://localhost:5000
```

---

# **Frontend Setup**

## **1. Go to the frontend folder**

```bash
cd builder-app1
```

## **2. Install dependencies**

```bash
npm install
```

## **3. Create environment variables**

Create a `.env.local` file inside `builder-app1`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_BUILDER_API_KEY=your_builder_api_key
```

## **4. Run the frontend**

```bash
npm run dev
```

The frontend will run on:

```bash
http://localhost:3000
```

---

# **Useful Commands**

## **Backend**

```bash
npm install
npx nodemon server.js
```

## **Frontend**

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
```

---

# **Example API Requests**

## **Create a User**

```http
POST /api/users/register
Content-Type: application/json
```

```json
{
  "username": "advertiser1",
  "email": "advertiser@example.com",
  "password": "password123",
  "phone": "0600000000"
}
```

---

## **Login**

```http
POST /api/users/login
Content-Type: application/json
```

```json
{
  "email": "advertiser@example.com",
  "password": "password123"
}
```

---

## **Create a Reservation**

```http
POST /api/reservations
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "adname": "Summer Radio Campaign",
  "addomaine": "Retail",
  "totalPrice": "1200",
  "audioFile": "uploaded-audio.mp3",
  "audioDuration": 30
}
```

---

# **Authentication**

The backend uses **JWT authentication**.

Protected routes require the following header:

```http
Authorization: Bearer <token>
```

---

# **Deployment**

## **Backend**

The backend can be deployed on platforms such as:

- **Render**
- **Railway**
- **Heroku**
- **Netlify Functions**
- **VPS**

## **Frontend**

The frontend can be deployed on:

- **Vercel**
- **Netlify**

---

# **Git Ignore Recommendations**

Add or verify the following rules:

```gitignore
node_modules/
.next/
out/
build/
dist/
.env
.env.local
uploads/
*.log
.DS_Store
```

Important:

```text
uploads/
```

should normally not be pushed to GitHub because it may contain generated audio files or user-uploaded files.

---

# **Security Recommendations**

- **Do not push .env files to GitHub**
- **Do not expose API keys**
- **Do not push uploaded audio files**
- **Use strong JWT secrets**
- **Use environment variables for production URLs**
- **Add input validation**
- **Add centralized error handling**
- **Protect admin-only routes**
- **Use HTTPS in production**

---

# **Author**

Developed by **Noris69**.
