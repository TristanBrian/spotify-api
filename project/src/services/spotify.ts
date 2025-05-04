// API service for Spotify

const clientID = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

if (!clientID || !clientSecret) {
  throw new Error("Missing Spotify client ID or client secret in environment variables");
}

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

let cachedToken: string | null = null;
let tokenExpiration: number | null = null;

function encodeBase64(str: string): string {
  if (typeof window === 'undefined') {
    // Node.js environment
    return Buffer.from(str).toString('base64');
  } else {
    // Browser environment
    return btoa(str);
  }
}


export async function getAccessToken(): Promise<string> {
  // Check if we have a valid cached token
  if (cachedToken && tokenExpiration && Date.now() < tokenExpiration) {
    return cachedToken;
  }

  // Log clientID and clientSecret length for debugging (mask actual values)
  console.log(`clientID length: ${clientID?.length}, clientSecret length: ${clientSecret?.length}`);

  const credentials = encodeBase64(`${clientID}:${clientSecret}`);

  // Log the base64 encoded credentials for debugging
  console.log(`Encoded credentials: ${credentials}`);

  const authParams = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${credentials}`,
    },
    body: `grant_type=client_credentials`,
  };

  const response = await fetch("https://accounts.spotify.com/api/token", authParams);
  const data: TokenResponse & { error_description?: string } = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error_description || "Failed to fetch access token");
  }
  
  // Cache the token and set expiration
  cachedToken = data.access_token;
  // Set expiration 5 minutes before actual expiry to be safe
  tokenExpiration = Date.now() + (data.expires_in - 300) * 1000;
  
  return data.access_token;
}

export async function searchArtist(query: string, accessToken: string) {
  if (!query.trim()) {
    throw new Error("Please enter an artist name");
  }

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist`,
    params
  );
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error?.message || "Error searching for artist");
  }
  
  if (!data.artists.items.length) {
    throw new Error("No artist found");
  }
  
  return data.artists.items[0];
}

export async function getArtistAlbums(artistId: string, accessToken: string) {
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&market=US&limit=20`,
    params
  );
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error?.message || "Error fetching albums");
  }
  
  return data.items || [];
}
