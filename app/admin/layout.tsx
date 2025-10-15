import type React from "react"
import { Providers } from "../providers"

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>
}
