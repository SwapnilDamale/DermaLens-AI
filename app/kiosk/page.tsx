import type { Metadata } from "next";
import KioskClient from "@/components/kiosk/KioskClient";

export const metadata: Metadata = {
  title: "Skin Station kiosk demo",
  description: "Interactive retail Skin Station demo — touch-friendly kiosk experience for in-store skincare recommendations.",
};

// Hide nav/footer for the kiosk experience — full-screen immersive
export default function KioskPage() {
  return <KioskClient />;
}
