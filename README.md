<div align="center">
  <br />
      <img src="https://res.cloudinary.com/dkl9cqqui/image/upload/v1728889071/Podcaster_m8jwef.png" alt="Project Banner">
  <br />

  <div>
    <img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="next-js" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript" />
    <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn" />
    <img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white" alt="stripe" />
    <img src="https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white" alt="gemini" />
    <img src="https://img.shields.io/badge/Clerk-000000?style=for-the-badge&logo=clerk&logoColor=white" alt="clerk" />
  </div>

  <h3 align="center">Podcaster - Fullstack AI Web Application</h3>

   <div align="center">
     I built this podcast application to explore the integration of AI technologies, like Gemini AI and text-to-speech AI, in content creation. This project aims to improve user interaction with AI through APIs, offering a modern design and a seamless experience. It's also an opportunity to deepen my skills in TypeScript and full-stack development while creating a practical and innovative tool.
    </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 📘 [Intro](#introduction)
2. 🛠️ [Tech Stack](#tech-stack)
3. ✨ [Features](#features)
4. 🚀 [Quick Start](#quick-start)
5. 📄 [License](#license)

## <a name="introduction">📘 Intro</a>

This full-stack podcast application leverages AI to create and share podcasts easily. Using Gemini AI for podcast creation and text-to-speech AI to generate audio files, the app provides a seamless experience for users. It includes user-friendly features like authentication, podcast sharing, and subscription plans, all designed with modern design principles and built using TypeScript for an optimized, interactive experience. 

With this app, users can unlock new possibilities in podcast creation and enjoy a more streamlined interaction with AI technologies.

## <a name="tech-stack">🛠️ Tech Stack</a>

- Next JS
- Typescript
- Shadcn
- Tailwind
- Gemini
- PlayHT
- Convex
- Clerk
- Stripe

## <a name="features">✨ Features</a>

⭐ **User Authentication**: Users can create podcasts effortlessly using Gemini AI and text-to-speech AI.

⭐ **Podcast Sharing**: Share podcasts with others, allowing users to engage with a broader audience.

⭐ **Search and Filter Functionality**: Users can search and filter podcasts based on various criteria to easily find content.

⭐ **Custom Music Player**: Enjoy listening to podcasts with a built-in, customizable music player.

⭐ **Subscription Plans and Tokens**: Users can choose subscription plans (monthly or yearly) to receive tokens for creating podcasts.

⭐ **Admin Dashboard**: An admin panel provides full control to manage users, statistics, podcasts, and payments securely.

## <a name="quick-start">🚀 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/Deynao1996/next-podcaster.git
cd next-podcaster
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
ORGANIZATION_ID=

NEXT_PUBLIC_CLERK_SIGN_IN_URL='/sign-in'
NEXT_PUBLIC_CLERK_SIGN_UP_URL='/sign-up'

PLAYHT_SECRET_KEY=
PLAYHT_USER_ID=

GEMINI_SECRET_KEY=

STRIPE_KEY=
STRIPE_WEBHOOKS_SECRET=
```

Replace the placeholder values with your actual Public credentials.

**Running the Project**

```bash
npm start
```

This will launch the application in development mode. 

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="license">📄 License</a>

This project is licensed under the [MIT License](https://github.com/Deynao1996/next-podcaster/blob/master/LICENSE.txt).

