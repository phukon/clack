import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "./hero"
import Grid from "./daysgrid";

export default function LaunchWeek() {
  return (
    <>
      <Header />
      <div>
        <div className="relative isolate overflow-hidden bg-white ">
          <Hero />
          <Grid />
        </div>
      </div>
      <Footer />
    </>
  );
}
