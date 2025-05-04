# Spotify API Project

This project is a Spotify API client application that allows users to search for artists and view their albums using the Spotify Web API.

## Features

- Fetches an access token from Spotify using client credentials flow.
- Searches for artists by name.
- Retrieves albums for a selected artist.
- Caches access tokens to reduce redundant API calls.

## Prerequisites

- Node.js and npm installed on your machine.
- A Spotify Developer account with a registered application to obtain Client ID and Client Secret.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/TristanBrian/spotify-api.git
cd spotify-api
```

### Setup Environment Variables

Create a `.env` file in the root directory of the project with the following content:

```
VITE_CLIENT_ID=your_actual_client_id
VITE_CLIENT_SECRET=your_actual_client_secret
```

Replace `your_actual_client_id` and `your_actual_client_secret` with your Spotify application's Client ID and Client Secret.

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or the port specified by Vite).

## Troubleshooting

- If you encounter a `400 Bad Request` with "Invalid client" error, ensure that your `VITE_CLIENT_ID` and `VITE_CLIENT_SECRET` environment variables are correctly set without any trailing comments or spaces.
- Restart the development server after changing environment variables.

## Project Structure

- `src/services/spotify.ts`: Contains functions to interact with the Spotify API, including token management and API calls.
- `src/components/`: React components for UI.
- `src/hooks/`: Custom React hooks.
- `src/App.tsx`: Main application component.

## Building for Production

To build the project for production, run:

```bash
npm run build
```

This will create an optimized production build in the `dist` directory.

To preview the production build locally, run:

```bash
npm run preview
```

This will serve the production build at `http://localhost:4173` by default.

## Deployment

The contents of the `dist` directory can be deployed to any static hosting service such as:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

### Deploying to Netlify

To deploy this project to Netlify:

1. Ensure you have a Netlify account and the Netlify CLI installed (`npm install -g netlify-cli`).

2. In the project root, create a `netlify.toml` file with the following content:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[dev]
  command = "npm run dev"
  port = 3000
```

3. Run the build command:

```bash
npm run build
```

4. Deploy to Netlify using the CLI:

```bash
netlify deploy --prod --dir=dist
```

5. Set your environment variables (`VITE_CLIENT_ID` and `VITE_CLIENT_SECRET`) in the Netlify dashboard under Site Settings > Build & Deploy > Environment.

Ensure that your environment variables (`VITE_CLIENT_ID` and `VITE_CLIENT_SECRET`) are set appropriately in your hosting environment or build pipeline.

## License

This project is open source and available under the MIT License.

## Repository

[https://github.com/TristanBrian/spotify-api](https://github.com/TristanBrian/spotify-api)
