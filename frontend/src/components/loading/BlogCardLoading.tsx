import { Skeleton } from "../ui/skeleton";

const BlogCardLoading = () => {
  return (
    <div className="px-4 py-2 rounded-lg space-y-2 border-2 ">
      <div className="flex justify-start items-center  space-x-3">
        <Skeleton
          className=" rounded-full aspect-square border-2 text-lg w-12 text-white font-bold flex justify-center items-center 
      "
        >
          <Skeleton className="h-4" />
        </Skeleton>
        <Skeleton className="h-2" />

        <Skeleton className="h-2" />
      </div>
      <Skeleton className="h-2" />
      <Skeleton className="h-5 " />
    </div>
  );
};

export default BlogCardLoading;
