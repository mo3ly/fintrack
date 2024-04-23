# FinTrack

<div align="center">
  <img src="https://i.ibb.co/hKGZ5Z1/banner.png" alt="Banner Image">
</div>
<div align="center">
  <img src="https://i.ibb.co/3mtwFbF/793shots-so.jpg" alt="Screenshot Image">
</div>

**FinTrack** simplifies financial tracking by allowing users to record expenses and revenues effectively. It combines modern web technologies and features to provide a seamless experience. Deployed live at [FinTrack](https://fintrack.cash/).

# Features

- **Dashboard**: Quick financial overview with charts and recent transactions.
- **Transactions**: Manage and track spending with options to add, edit, or delete transactions. Supports receipt uploads and multiple currencies.
- **Categories**: Categorize expenses and revenues for organized financial planning.
- **Account**: Secure user account management.
- **Settings**: Personalize settings including language, currency, and themes.
- **Multi-Currency Support**: Handle transactions in various currencies.
- **Bilingual Interface**: Supports Arabic and English, with RTL and LTR layouts.
- **Dark and Light Modes**: Toggle between themes for comfort.

## Technologies

- **Next.js**
- **TailwindCSS**
- **Drizzle ORM**
- **Turso**
- **Shadcn/ui**
- **Lucia Auth**
- **Typescript**
- **Server Actions**
- **React Server Components (RSC)**
- **Next.js Progress Bar**
- **OAuth Integration**
- **Internationalization**: Supported with `next-international`.
- **Custom Hooks and Utilities**

## Credits and Acknowledgements

- **File Uploader**: Features the `file-uploader` component by Sadman Samee, incorporating `shadcn` for enhanced UI components. [View Source](https://github.com/sadmann7/file-uploader)
- **OAuth Provider**: Implements Google authentication through `orbitkit` by Ahmed Magdi, offering robust OAuth capabilities. [View Source](https://github.com/ixahmedxi/orbitkit/blob/main/packages/auth/src/providers/google.ts)
- **Tailwind Animation**: Utilizes animations from the `Slug` open-source repository. [View Source](https://github.com/pheralb/slug)

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd fintrack
pnpm install
```

### Environment Setup

```bash
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


# Beam Analytics configuration
BEAM_ANALYTICS_TOKEN=

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
