import Application from "@/components/application";

const GenuineApplications = () => {
  return (
    <main className="flex-grow border-x-[1px] border-neutral-11">
      <div className="flex flex-col gap-y-5 pt-10 sticky top-0 backdrop-blur-3xl">
        <div className="text-neutral-7 flex justify-evenly">
          <p className="text-blue-50">Distance -- Nearest</p>
          <p>Rating -- High to Low</p>
          <p>Newest First</p>
        </div>
        <div className="flex items-center">
          <hr className="bg-neutral-7 h-[3px] flex-grow " />
          <hr className="bg-neutral-11 h-px flex-grow" />
          <hr className="bg-neutral-11 h-px flex-grow" />
        </div>
      </div>
      {/* zakaat application */}
      {Array.from({ length: 20 }).map((_, key) => (
        <Application key={key} />
      ))}
    </main>
  );
};

export default GenuineApplications;
