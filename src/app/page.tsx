import { Toast } from "@/components/common/Toast";
import { FloatingButton } from "@/app/_sections/FloatingButton";
import { Header } from "@/app/_sections/Header";
import { WeddingDay } from "@/app/_sections/WeddingDay";
import { Intro } from "@/app/_sections/Intro";
import { Profiles } from "@/app/_sections/Profiles";
import { Gallery } from "@/app/_sections/Gallery";
import { MapSection } from "@/app/_sections/MapSection";
import { Gift } from "@/app/_sections/Gift";
import { Guestbook } from "@/app/_sections/Guestbook";
import { Rsvp } from "@/app/_sections/Rsvp";
import { Notice } from "@/app/_sections/Notice";
import { Footer } from "@/app/_sections/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Intro />
      <WeddingDay />
      <Profiles />
      <Gallery />
      <MapSection naverMapClientId={process.env.NEXT_NAVER_MAP_CLIENT_ID} />
      <Gift />
      <Notice />
      <Guestbook />
      <Rsvp />
      <Footer />
      <Toast />
      <FloatingButton />
    </main>
  );
}
