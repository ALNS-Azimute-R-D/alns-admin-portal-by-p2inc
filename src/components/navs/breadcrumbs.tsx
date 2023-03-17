import { FC } from "react";
import { Link } from "react-router-dom";

type BreadcrumbItem = {
  title: string;
  link: string;
};

type Props = {
  items: Array<BreadcrumbItem>;
};

const Breadcrumbs: FC<Props> = ({ items }) => {
  return (
    <div className="flex">
      {items.map((item) => (
        <div className="mr-3 flex items-center space-x-3" key={item.title}>
          <Link
            to={item.link}
            className="-ml-3 -mr-3 rounded-lg px-3 py-1 font-medium transition hover:bg-gray-100 md:text-xl"
          >
            <div>{item.title}</div>
          </Link>
          <div className="hidden text-xl opacity-10 md:block">/</div>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
