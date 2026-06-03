export interface ContactDraft {
  name: string
  email: string
  message: string
}

export interface ContactMessage extends ContactDraft {
  id: string
  createdAt: string
  read: boolean
}
