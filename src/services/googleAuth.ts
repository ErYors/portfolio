import { googleCredentialSchema, type User } from '@/types'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
const GIS_SRC = 'https://accounts.google.com/gsi/client'

let scriptPromise: Promise<void> | null = null

function loadGisScript(): Promise<void> {
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = GIS_SRC
    script.async = true
    script.onload = () => {
      resolve()
    }
    script.onerror = () => {
      reject(new Error('Échec du chargement de Google Identity Services'))
    }
    document.head.appendChild(script)
  })
  return scriptPromise
}

function base64UrlDecode(input: string): string {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/')
  const binary = atob(base64)
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export function parseCredential(credential: string): User {
  const [, payload] = credential.split('.')
  if (!payload) throw new Error('Credential Google invalide')
  const decoded: unknown = JSON.parse(base64UrlDecode(payload))
  const profile = googleCredentialSchema.parse(decoded)
  return {
    id: profile.sub,
    name: profile.name,
    email: profile.email,
    picture: profile.picture,
  }
}

export async function initGoogleAuth(
  onLogin: (user: User) => void,
): Promise<void> {
  if (!CLIENT_ID) {
    throw new Error('VITE_GOOGLE_CLIENT_ID manquant (voir .env.example)')
  }
  await loadGisScript()
  google.accounts.id.initialize({
    client_id: CLIENT_ID,
    callback: (response) => {
      onLogin(parseCredential(response.credential))
    },
  })
}

export function renderGoogleButton(container: HTMLElement): void {
  google.accounts.id.renderButton(container, {
    type: 'standard',
    theme: 'outline',
    size: 'large',
    shape: 'pill',
    text: 'signin_with',
  })
}
