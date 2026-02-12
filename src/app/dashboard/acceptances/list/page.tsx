import { redirect } from 'next/navigation'

export default function AcceptanceListRedirectPage() {
  redirect('/dashboard/acceptances')
}