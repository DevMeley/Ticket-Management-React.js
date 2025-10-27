import Hero from "../components/Hero";
import HomeHeader from "../components/Header";
import { MdManageHistory, MdOutlinePhonelinkSetup } from "react-icons/md";
import { LuTicket } from "react-icons/lu";
import Footer from "../components/footer";

export default function Landing() {
  return (
    <main>
      <HomeHeader />
      <Hero />
      <section className="container-centered py-12 grid gap-6 lg:grid-cols-3">
        <div className="card flex flex-col gap-4">
          <h4 className="font-semibold text-2xl flex items-center gap-4 ">
            {" "}
            <MdOutlinePhonelinkSetup />
            Fast setup
          </h4>
          <p className="mt-2 text-sm text-slate-600">
            Start with the provided test user or sign up.
          </p>
        </div>
        <div className="card flex flex-col gap-4">
          <h4 className="font-semibold text-2xl  flex items-center gap-4">
            <LuTicket />
            Create Tickets
          </h4>
          <p className="mt-2 text-sm text-slate-600">
            Submit new tickets instantly with validation and automatic tracking.
          </p>
        </div>
        <div className="card flex flex-col gap-4">
          <h4 className="font-semibold text-2xl  flex items-center gap-4 ">
            {" "}
            <MdManageHistory />
            View & Manage
          </h4>
          <p className="mt-2 text-sm text-slate-600">
            See open, in-progress, and closed tickets all in one organized
            dashboard.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
