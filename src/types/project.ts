export const ProjectStatus = {
  BRIEFING: "briefing",
  PROPOSAL_SENT: "proposal_sent",
  CONTRACT_SIGNED: "contract_signed",
  IN_DEVELOPMENT: "in_development",
  COMPLETED: "completed",
  PROPOSAL_REJECTED: "proposal_rejected",
} as const;

export type ProjectStatusType = (typeof ProjectStatus)[keyof typeof ProjectStatus];

export const DocumentType = {
  PROPOSAL: "proposal",
  CONTRACT: "contract",
  ACCEPTANCE: "acceptance",
} as const;

export type DocumentTypeType = (typeof DocumentType)[keyof typeof DocumentType];
