This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
## Features

### Pages & Functionalities

- **Home / Product Listing Page**
  - Displays a product grid
  - Infinite scroll with batch reloading
  - Real-time search functionality for products
  - Category-based filtering
  - Add to cart functionality

- **Product Detail Page** (`/product/[id]`)
  - Dynamic routing to individual product pages
  - Displays product details such as name, image, price, category, rating, and description
  - Ability to add products to the cart
  - Ability to add products to the wishlist (wishlist handled via `localStorage`)

- **Cart Page** (`/cart`)
  - Displays items added to the cart
  - Ability to manage product quantities and remove items
  - Cart data persisted in `localStorage`
  - Access to the Address Form

- **Address Form (within Cart Page)**
  - Collects shipping details: Full Name, Contact, Address, City, Postal Code, State, and Country
  - Validates required fields
  - Stores the entered address in `localStorage`
  - Toast notifications for success/error during form submission

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Product Listing App - Next.js

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

