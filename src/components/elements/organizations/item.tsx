import cs from "classnames";
import { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  link: string;
  title?: string;
  subTitle?: string;
  viewType: string;
};

const Title = ({ children }) => <div className="font-semibold">{children}</div>;
const SubTitle = ({ children }) => (
  <div className="text-[14px]">{children}</div>
);

const OrganizationItem: FC<Props> = ({
  children,
  link,
  title,
  subTitle,
  viewType,
}) => {
  return (
    <Link
      to={link}
      className={cs(
        "group block",
        "focus:outline-none focus:ring-1 focus:ring-neutral-50 focus:ring-offset-1",
        {
          "pb-1": viewType === "grid",
        }
      )}
    >
      <div className="relative">
        <div className="relative z-20">
          <div
            className={cs(
              "col-span-1 flex",
              "group-hover:border-gray-300 group-hover:bg-white",
              {
                "flex-col space-y-5 rounded-md border border-gray-200 bg-gray-50 px-10 py-9":
                  viewType === "grid",
                "flex-row justify-between px-4 py-2": viewType === "list",
              }
            )}
          >
            <div className="">
              <Title>{title}</Title>
              <SubTitle>{subTitle}</SubTitle>
            </div>
            <div className="flex flex-row space-x-8">{children}</div>
          </div>
        </div>
        {viewType === "grid" && (
          <div
            className={cs(
              "absolute inset-x-3 bottom-0 z-10 h-1/2 rounded-full bg-white opacity-0",
              "transition-opacity duration-200",
              "group-hover:opacity-100",
              "drop-shadow-btn-light group-active:hidden"
            )}
          ></div>
        )}
      </div>
    </Link>
  );
};

export default OrganizationItem;
