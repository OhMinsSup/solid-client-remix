import React from "react";

// components
import { Link } from "@remix-run/react";
import { Logo as RemixLogo } from "~/components/ui/Logo";
import { Button } from "../Shared";

// hooks
import { useWriteStore } from "~/stores/useWriteStore";

interface WriterHeaderProps {}

const WriterHeader: React.FC<WriterHeaderProps> = () => {
  const { openSetting } = useWriteStore();

  return (
    <div className="border-b p-4 2xl:px-5">
      <div className="mx-auto flex w-full flex-row items-center justify-between sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px]">
        <Link to={"/"} className="block w-16 flex-shrink-0 md:w-20">
          <RemixLogo className="h-5 w-full fill-current" />
        </Link>
        <div className="relative flex flex-row">
          <Button
            onPress={openSetting}
            className="ml-2 flex flex-row items-center justify-center rounded-full border border-blue-500 bg-blue-500 py-1 px-3 text-center text-lg font-semibold text-white outline-none hover:shadow-md"
          >
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WriterHeader;
