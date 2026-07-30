import { ShieldCheck } from "lucide-react";

import UnderConstructionPage from "@/components/admin/under-construction-page";

export default function SystemManagementPage() {
  return (
    <UnderConstructionPage
      icon={ShieldCheck}
      eyebrow="Maya Burger system management"
      title="SYSTEM"
      description="We are preparing system controls for administrator accounts, roles and permissions, security activity, backups, logs, and website management."
    />
  );
}