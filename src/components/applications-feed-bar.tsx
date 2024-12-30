export default function ApplicationsFeedBar() {
  return (
    <div className="flex border-b-[1px] border-neutral-11 sticky top-0 backdrop-blur-3xl xs:pt-8 pt-4">
      <p className="text-blue-50 w-[33.33%] py-[10px] leading-tight grow text-center border-b-[1px] border-brand-blue">
        Nearest
      </p>
      <p className="text-neutral-7 w-[33.33%] py-[10px] leading-tight grow text-center">
        Rating -- High to Low
      </p>
      <p className="text-neutral-7 w-[33.33%] py-[10px] leading-tight grow text-center">
        Newest
      </p>
    </div>
  );
}
