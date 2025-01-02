import Searchbar from "../common/search-bar";
import PotentialContact from "../potential-contact";
import DP from "@/../public/dashboard/dp.png";

export default function RightSidebar() {
  return (
    <aside className="pl-[10px] py-[30px] min-w-[286px] xl:flex flex-col gap-y-[60px] sticky top-0 max-h-screen hidden">
      <Searchbar />
      <div className="flex flex-col gap-y-5">
        <p className="text-blue-50 text-lg">Who to follow?</p>

        <PotentialContact dp={DP} fullName="Sadiq Vali" />
        <PotentialContact dp={DP} fullName="Sadiq Vali" />
        <PotentialContact dp={DP} fullName="Sadiq Vali" />

        <p className="text-neutral-7 text-lg">Show More</p>
      </div>
    </aside>
  );
}
