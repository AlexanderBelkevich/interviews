export interface IInterview {
  id: string
  company: string
  vacancyLink: string
  hrName: string
  contactTelegram?: string
  contactWhatsApp?: string
  contactPhone?: string
  createdAt: Date
  result?: 'Refusal' | 'Offer' | 'Ignore'
  stages?: IStage[]
  salaryFrom?: number
  salaryTo?: number
}

export interface IStage {
  name: string
  date: string
  description: string
}
