import { pickBy } from "lodash";

export enum Roles {
  ManageIdentityProviders = "manage-identity-providers",
  ManageInvitations = "manage-invitations",
  ManageMembers = "manage-members",
  ManageOrganization = "manage-organization",
  ManageRoles = "manage-roles",
  ManageClusters = "manage-clusters",
  ViewIdentityProviders = "view-identity-providers",
  ViewInvitations = "view-invitations",
  ViewMembers = "view-members",
  ViewOrganization = "view-organization",
  ViewRoles = "view-roles",
  ViewClusters = "view-clusters",
}

export const OrgRoles = Object.values(Roles);
export const manageRoles = pickBy(Roles, (val) =>
  val.startsWith("manage")
) as typeof Roles;
export const viewRoles = pickBy(Roles, (val) =>
  val.startsWith("view")
) as typeof Roles;

export const roleSettings = [
  {
    regexp: new RegExp("^view-"),
    name: "view roles",
    className: "bg-[#7CE0C3]",
  },
  {
    regexp: new RegExp("^manage-"),
    name: "manage roles",
    className: "bg-[#C07CE0]",
  },
  // {
  //   regexp: new RegExp("^(?!view-|manage-).*$"),
  //   name: "other roles",
  //   className: "bg-gray-600",
  // },
];

export function getRoleSettings(name: string) {
  const settings = roleSettings.find((f) => f.regexp.test(name));
  return settings;
}
