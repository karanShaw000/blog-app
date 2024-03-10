import { Skeleton } from "../ui/skeleton";

const BlogLoading = () => {
  return (
    <section className="max-w-screen-xl w-[80%] mx-auto py-6  grid grid-cols-[70%_20%] justify-between">
      <div className="space-y-3">
        <Skeleton className="h-5" />
        <Skeleton className="h-5" />
        <Skeleton className="h-[200px]" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-2" />
        <div className="flex justify-start tems-center space-x-2">
          <Skeleton
            className=" rounded-full aspect-square border-2 text-lg w-12  text-white font-bold flex justify-center items-center 
      "
          />
          <Skeleton className="h-2" />
        </div>
      </div>
    </section>
  );
};

export default BlogLoading;
