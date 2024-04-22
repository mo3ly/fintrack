# FinTrack

<div align="center">
  <img src="https://i.ibb.co/hKGZ5Z1/banner.png" alt="Banner Image">
</div>
<div align="center">
  <img src="https://i.ibb.co/3mtwFbF/793shots-so.jpg" alt="Screenshot Image">
</div>

**FinTrack** simplifies financial tracking by allowing users to record expenses and revenues effectively. It combines modern web technologies and features to provide a seamless experience. Deployed live at [FinTrack](https://fintrack.cash/).

# Features

- **Dashboard**: Provides an overview of your financial status with recent transactions and summary charts.
- **Transactions**: Manage all financial transactions with options to add, edit, or delete. Each transaction can include uploading a receipt image for better record-keeping. Supports multiple currencies, allowing you to track expenses and revenues in different monetary units.
- **Categories**: Organize expenses and revenues into categories for better financial planning.
- **Account**: User account management featuring secure authentication.
- **Settings**: Customize application settings including localization, currency and theme preferences.
- **Multi-Currency Support**: Conduct and track transactions in multiple currencies.
- **Bilingual Interface**: Fully supports Arabic and English with adaptable Right-to-Left (RTL) and Left-to-Right (LTR) layouts, ensuring a seamless user experience for a global audience.
- **Dark and Light Modes**: Choose your preferred theme for optimal viewing comfort.

## Technologies

- **Next.js**: Framework for building scalable server-rendered React applications.
- **TailwindCSS**: Utility-first CSS framework for rapid UI development.
- **Drizzle ORM**: Lightweight and performant TypeScript ORM. [More Info](https://orm.drizzle.team)
- **Turso**: SQLite for production with scalable per-tenant database architecture. [More Info](https://turso.tech)
- **Shadcn/ui**: Beautifully designed, customizable, and accessible UI components. [More Info](https://ui.shadcn.com)
- **Lucia Auth**: Authentication system for managing user sessions.
- **Typescript**: Strongly typed programming language that builds on JavaScript.
- **React Server Components (RSC)**: Server-side rendering for React components.
- **Next.js Progress Bar**: Visual feedback on page loading states.
- **OAuth Integration**: Authentication using Google or custom credentials.
- **Internationalization**: Supported with `next-international`.
- **Custom Hooks and Utilities**: For state management and other reusable logic.
- **Server Actions**: Secure and efficient backend operations.

## Credits and Acknowledgements

- **File Uploader**: Utilizes the `file-uploader` component by Sadman Samee, which leverages `shadcn` for UI components. [View Repository](https://github.com/sadmann7/file-uploader)

- **OAuth Provider**: Implements Google authentication using `orbitkit` by Ahmed Magdi, which provides a comprehensive setup for OAuth. [View Google Auth Provider Source](https://github.com/ixahmedxi/orbitkit/blob/main/packages/auth/src/providers/google.ts)

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd fintrack
pnpm install
```

### Environment Setup

```
# Database configuration
DATABASE_URL=your_database_connection_string
DATABASE_AUTH_TOKEN=your_database_auth_token

# Google OAuth Configuration
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
GOOGLE_CODE_VERIFIER=your_google_code_verifier

# Upload component configuration
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Replace each placeholder with the appropriate values for your configuration.

### Starting the Server

```bash
pnpm run dev
```

# Deploy to Vercel

Click the button below to deploy this project to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/mo3ly/fintrack)

## Contributing

Contributions are welcome! Please feel free to submit pull requests or create issues for bugs and feature requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
