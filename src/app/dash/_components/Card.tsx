/**
 * TODO: Change <a> tags
 */

const Card = () => {
  return (
    <a className="rounded-md p-2 group col-span-1" href="/note?id=1000000001">
      <div className="rounded-xl border border-stone-200 bg-white text-stone-950 shadow dark:border-stone-800 dark:bg-stone-950 dark:text-stone-50 group-hover:scale-105 duration-150 ease-out">
        <div className="flex flex-col space-y-1.5 p-6 rounded-t-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-stone-100 group-active:bg-stone-200 py-2">
          <h3 className="tracking-tight text-sm font-semibold">
            Welcome to Notty notes! (OPEN ME)
          </h3>
        </div>
        <div className="p-6 pt-0 relative overflow-hidden h-40">
          <p className="text-sm mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In elit
            dolor, fermentum ut pretium vel, rhoncus sit amet diam. Duis
            volutpat in velit vel dictum. Donec vehicula ante turpis, a dapibus
            nisl hendrerit vitae. Donec blandit elementum enim eu pretium.
            Vestibulum et elementum tellus. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Donec mi sapien, vulputate sed velit
            sed, pharetra laoreet magna. Sed tincidunt orci in ante lobortis,
            quis pellentesque ante venenatis. Vestibulum id convallis sem.
            Quisque a sollicitudin erat. Cras luctus, orci sit amet commodo
            tempus, est nibh cursus tellus, in interdum lorem elit vitae nunc.
            Donec nec lectus maximus, commodo dolor ac, faucibus enim. Nulla
            condimentum vehicula dolor, non euismod mi vestibulum a. Fusce
            bibendum tincidunt quam, ac commodo nunc iaculis quis. Nam tempus
            erat felis, at lobortis ex facilisis bibendum.
          </p>
          <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-white dark:from-gray-900"></div>
          <div className="absolute bottom-4 right-4 z-10">
            <button className="flex h-10 w-10 items-center justify-center rounded-md p-2 bg-white hover:bg-stone-100 active:bg-stone-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Card;
