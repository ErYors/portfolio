import type { ReactNode } from 'react'
import Skeleton from './Skeleton'

function Status({ children }: { children: ReactNode }) {
  return (
    <div role="status" aria-label="Chargement…">
      {children}
    </div>
  )
}

export function HomeSkeleton() {
  return (
    <Status>
      <section className="mx-auto max-w-300 px-6 pt-10 pb-16 sm:pt-14 sm:pb-24 xl:px-0">
        <div className="flex max-w-121.5 flex-col gap-8">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-5 w-full max-w-md" />
          <div className="flex gap-3">
            <Skeleton className="h-11 w-32" />
            <Skeleton className="h-11 w-32" />
          </div>
        </div>
      </section>
    </Status>
  )
}

export function AboutSkeleton() {
  return (
    <Status>
      <div className="mx-auto max-w-300 px-6 py-16 xl:px-0">
        <div className="flex max-w-147 flex-col gap-8">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-full max-w-xl" />
          <Skeleton className="h-4 w-full max-w-lg" />
          <Skeleton className="h-11 w-32" />
        </div>
      </div>
    </Status>
  )
}

export function ContactSkeleton() {
  return (
    <Status>
      <div className="mx-auto flex max-w-300 flex-col items-center gap-12 px-6 py-16 xl:px-0">
        <Skeleton className="h-10 w-40" />
        <div className="flex w-100 max-w-full flex-col gap-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-11 w-24 self-end" />
        </div>
      </div>
    </Status>
  )
}

export function ProjectDetailSkeleton() {
  return (
    <Status>
      <section className="mx-auto max-w-300 px-6 py-16 xl:px-0">
        <Skeleton className="h-4 w-36" />
        <div className="mt-8 grid items-center gap-10 md:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-3xl" />
          <div className="flex flex-col gap-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-11 w-40" />
          </div>
        </div>
      </section>
    </Status>
  )
}

export function LoginSkeleton() {
  return (
    <Status>
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-6">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-72 w-full max-w-sm rounded-2xl" />
      </div>
    </Status>
  )
}

export function AdminDashboardSkeleton() {
  return (
    <Status>
      <section className="mx-auto flex max-w-300 flex-col gap-8 px-6 py-12">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-72 max-w-full" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
        </div>
      </section>
    </Status>
  )
}

export function AdminProjectsSkeleton() {
  return (
    <Status>
      <section className="mx-auto flex max-w-300 flex-col gap-8 px-6 py-16 xl:px-0">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-11 w-40 rounded-lg" />
        </div>
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-72 w-full rounded-2xl" />
      </section>
    </Status>
  )
}

export function AdminListSkeleton() {
  return (
    <Status>
      <section className="mx-auto flex max-w-300 flex-col gap-8 px-6 py-12">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-5 w-40" />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-28 w-full rounded-2xl" />
          <Skeleton className="h-28 w-full rounded-2xl" />
          <Skeleton className="h-28 w-full rounded-2xl" />
        </div>
      </section>
    </Status>
  )
}
