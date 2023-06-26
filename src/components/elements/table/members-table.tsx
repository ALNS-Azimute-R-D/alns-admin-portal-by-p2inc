import { useTranslation } from "react-i18next";
import { TableRows } from "./table";
import { Lock } from "lucide-react";

type Props = {
  rows: TableRows;
  isLoading?: boolean;
};

const loading = (
  <div className="space-y-2 p-4">
    <div className="h-4 w-20 rounded-md bg-gray-300 dark:bg-zinc-600"></div>
    <div className="h-4 w-40 rounded-md bg-gray-300 dark:bg-zinc-600"></div>
  </div>
);

const MembersTable: React.FC<Props> = ({ rows, isLoading }) => {
  const { t } = useTranslation();

  const disabledInfo = (
    <span className="mt-1 inline-flex text-sm text-orange-600 md:mt-0">
      {t("disabled")} <Lock className="ml-2 h-5 w-5" />
    </span>
  );

  return (
    <div className="rounded border border-gray-200 dark:border-zinc-600">
      {isLoading && loading}
      {!isLoading && (
        <>
          <div className="divide-y md:hidden">
            {rows.map((item) => (
              <div className="p-4" key={item["email"]}>
                <div className="text-sm font-semibold dark:text-zinc-200">
                  {item["name"]}
                </div>
                <div className="text-sm text-gray-500 dark:text-zinc-500">
                  {item["email"]}
                </div>
                {item["enabled"] === false && disabledInfo}
                <div className="space-y-1 py-2">{item["roles"]}</div>
                <div>{item["action"]}</div>
              </div>
            ))}
          </div>
          <table className="hidden w-full table-auto md:table">
            <tbody className="divide-y dark:divide-zinc-600">
              {rows.map((item) => {
                const isOrgAdmin = item.email?.startsWith("org-admin");
                if (isOrgAdmin) {
                  return (
                    <tr key={item["email"]}>
                      <td className="px-5 py-4 align-middle">
                        <div className="text-sm text-gray-500 dark:text-zinc-500">
                          {t("admin")}
                        </div>
                      </td>
                      <td
                        colSpan={2}
                        className="space-x-2 px-5 py-4 text-right align-middle"
                      ></td>
                      <td className="px-1 py-4 text-right align-middle">
                        <div className="h-[40px]"></div>
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={item["email"]}>
                    <td className="px-5 py-4 align-middle">
                      <div className="text-sm font-semibold dark:text-zinc-200">
                        {item["name"]}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-zinc-500">
                        {item["email"]}
                      </div>
                    </td>
                    <td className="w-1/4 space-x-2 px-5 py-4 text-right align-middle">
                      {item["enabled"] === false && disabledInfo}
                    </td>
                    <td className="space-x-2 px-5 py-4 text-right align-middle">
                      {item["roles"]}
                    </td>
                    <td className="px-1 py-4 pr-4 text-right align-middle">
                      {item["action"]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default MembersTable;
