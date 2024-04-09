export interface IInterview {
  id: string
  company: string
  vacancyLink: string
  hrName: string
  contactTelegram?: string
  contactWhatsApp?: string
  contactPhone?: string
  createdAt: Date
  result?: 'Отказ' | 'Оффер'
  stages?: {
    name: string
    date: string
    description: string
  }[]
}
