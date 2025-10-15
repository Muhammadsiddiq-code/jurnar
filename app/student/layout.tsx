import type React from "react"
import { Providers } from "../providers"

export default function StudentRootLayout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>
}
