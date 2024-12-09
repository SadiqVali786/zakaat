import Application from "@/components/application";
import ApplicationsFeedBar from "@/components/applications-feed-bar";

const GenuineApplications = () => {
  return (
    <main className="grow xs:border-x-[1px] border-neutral-11 max-w-[708px]">
      <ApplicationsFeedBar />
      <div className="flex flex-col gap-y-5 xs:px-4 pt-5">
        {Array.from({ length: 20 }).map((_, key) => (
          <Application
            key={key}
            fullName="Sadiq Vali"
            money="₹20,000"
            rank="7"
            text="Aisha Begum, a 45-year-old widow, struggles to raise her three
              children with a monthly income of ₹6,000. Due to unpaid school fees,
              her children risk losing access to education. Aisha requests ₹20,000
              to cover the overdue fees and purchase necessary school supplies.
              This financial support will help her children continue their studies
              and break the cycle of poverty, giving them hope for a brighter
              future."
          />
        ))}
      </div>
    </main>
  );
};

export default GenuineApplications;
