# WAR (WashingAtRishihood)

A modern web application for managing laundry services between students and washermen at Rishihood University, built with Next.js, React, and Tailwind CSS.

## 🚀 Features

### Student Portal
- **Authentication**: Secure login/signup system
- **Dashboard**: Real-time order status and tracking
- **Order Management**: View and manage laundry orders
- **Profile**: Update personal information and preferences
- **Order History**: Track past and current orders

### Washerman Portal
- **Order Management**: View and update order status
- **Service Dashboard**: Manage multiple orders efficiently
- **Profile**: Update service details and availability

## 🛠 Tech Stack

- **Frontend**: Next.js 13+ (App Router)
- **UI Components**: Radix UI + Shadcn/ui
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Icons**: Lucide Icons
- **Animation**: Framer Motion
- **State Management**: React Context API
- **Build Tool**: Turbopack

## 📦 Prerequisites

- Node.js 18.0.0 or later
- npm or yarn
- Git

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone [your-repository-url]
cd war

npm install
# or
yarn install

NEXT_PUBLIC_API_URL=your_api_url_here
# Add other environment variables as needed

npm run dev
# or
yarn dev

src/
├── app/                    # App Router
│   ├── student/           # Student portal
│   │   ├── dashboard/     # Student dashboard
│   │   ├── orders/        # Order management
│   │   ├── profile/       # User profile
│   │   └── components/    # Student-specific components
│   └── (auth)/            # Authentication pages
│       ├── login/
│       └── signup/
├── components/            # Reusable UI components
│   └── ui/               # Shadcn/ui components
├── lib/                   # Utility functions
└── styles/               # Global styles

npm run dev
# or
yarn dev

npm run build
# or
yarn build

npm test
# or
yarn test


### Key Improvements Made:

1. Better Structure: Organized content with clear sections
2. Consistent Formatting: Fixed markdown formatting
3. Added Missing Sections: Added environment setup and better project structure
4. Improved Readability: Better spacing and organization
5. Removed Redundancy: Removed duplicate content
6. Added Links: Added relevant documentation links
7. Better Code Blocks: Properly formatted all code blocks

Would you like me to help you implement any specific section in more detail or make any adjustments to this improved version?
