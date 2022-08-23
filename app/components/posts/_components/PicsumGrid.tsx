import React, { useRef } from "react";
import { usePhotoQuery } from "~/atoms/photoAtom";
import {
  getClientHeight,
  getScrollHeight,
  getScrollTop,
  getTargetElement,
} from "~/libs/browser-utils";
import { useEventListener } from "~/libs/hooks/useEventListener";
import PicsumGridCard from "./PicsumGridCard";

interface PicsumGridProps {}

const PicsumGrid: React.FC<PicsumGridProps> = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { fetchNext, photos } = usePhotoQuery();

  const scrollMethod = () => {
    const el = getTargetElement(ref);
    if (!el) {
      return;
    }

    const scrollTop = getScrollTop(el);
    const scrollHeight = getScrollHeight(el);
    const clientHeight = getClientHeight(el);

    if (scrollHeight - scrollTop <= clientHeight + 200) {
      fetchNext();
    }
  };

  useEventListener(
    "scroll",
    () => {
      scrollMethod();
    },
    { target: ref }
  );

  return (
    <div className="h-80 overflow-y-scroll" ref={ref}>
      <div className="grid grid-cols-8 gap-4 md:grid-cols-9">
        {photos.map((item, i) => (
          <PicsumGridCard key={`photo-item-${item.id}-${i}`} url={item.url} />
        ))}
      </div>
    </div>
  );
};

export default PicsumGrid;
