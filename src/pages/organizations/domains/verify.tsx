import Button from "components/elements/forms/buttons/button";
import CopyBlock from "components/elements/organizations/copy-block";
import RoundedIcon from "components/elements/rounded-icon";
import SectionHeader from "components/navs/section-header";
import P2Toast from "components/utils/toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { config } from "config";
import {
  useGetByRealmUsersAndUserIdOrgsOrgIdRolesQuery,
  useGetOrganizationDomainsQuery,
  useVerifyDomainMutation,
} from "store/apis/orgs";
import { Globe } from "lucide-react";
import useUser from "components/utils/useUser";
import { checkOrgForRole } from "components/utils/check-org-for-role";
import { Roles } from "services/role";

const addIcon = (
  <RoundedIcon className="my-4">
    <Globe className="h-5 w-5" />
  </RoundedIcon>
);

const DomainsVerify = () => {
  let { orgId, domainRecord } = useParams();
  const { realm } = config.env;
  const navigate = useNavigate();
  const { user } = useUser();

  const { data: domains = [] } = useGetOrganizationDomainsQuery({
    realm,
    orgId: orgId!,
  });
  const { data: userRolesForOrg = [] } =
    useGetByRealmUsersAndUserIdOrgsOrgIdRolesQuery(
      {
        orgId: orgId!,
        realm,
        userId: user?.id!,
      },
      { skip: !user?.id }
    );
  const hasManageOrganizationRole = checkOrgForRole(
    userRolesForOrg,
    Roles.ManageOrganization
  );

  const domain = domains.find((domain) => domain.record_value === domainRecord);

  const [verifyDomain, { isLoading: isVerifyDomainLoading }] =
    useVerifyDomainMutation();

  const checkVerification = async () => {
    if (domain && domain.domain_name) {
      await verifyDomain({
        domainName: domain.domain_name,
        orgId: orgId!,
        realm,
      })
        .unwrap()
        .then((r) => {
          console.log("🚀 ~ file: verify.tsx:62 ~ .then ~ r:", r);
          //@ts-ignore
          if (r.verified) {
            P2Toast({
              success: true,
              title: `${domain.domain_name} has been verified.`,
            });
            navigate(`/organizations/${orgId}/settings`);
          } else {
            P2Toast({
              error: true,
              title: `${domain.domain_name} failed to verify. Please check DNS records and try again.`,
            });
          }
        })
        .catch((e) => {
          return P2Toast({
            error: true,
            title: `${domain.domain_name} failed to verify. ${e.data.error}`,
          });
        });
    }
  };

  return (
    <div className="space-y-10 md:py-20">
      <div>
        <SectionHeader
          title={`Verify ${domain?.domain_name || "domain"}`}
          description="Use the following details to verify your domain."
          icon={addIcon}
          rightContent={
            <Link
              to={`/organizations/${orgId}/settings`}
              className="inline-block rounded-lg px-4 py-2 font-medium opacity-60 transition hover:bg-gray-100 hover:opacity-100 dark:text-zinc-200 dark:hover:bg-p2dark-1000"
            >
              Back to Settings
            </Link>
          }
        />
      </div>
      <div className="space-y-8">
        <CopyBlock
          labelNumber={1}
          label="Create a TXT record in your DNS configuration for the following hostname"
          value={domain?.record_key}
        />
        <CopyBlock
          labelNumber={2}
          label="Use this code for the value of the TXT record"
          value={domain?.record_value}
        />
        <Button
          isBlackButton={true}
          onClick={checkVerification}
          disabled={isVerifyDomainLoading || !hasManageOrganizationRole}
        >
          Verify
        </Button>
      </div>
    </div>
  );
};

export default DomainsVerify;
