export interface ComplianceStats {
  OpsEmpStatusChecked: number;
  Total: number;
  TaxStatus: number;
  Identification: number;
  RightToWork: number;
  OpsChecked: number;
  Contract: number;
  EmpStatusReview: number;
}

export interface Provider {
  rebatesTotal: number;
  grossPayTotal: number;
  workerCount: number;
  complianceStats: ComplianceStats;
  payrollAdminTotal: number;
  labourCostTotal: number;
  providerId: number;
  name: string;
}

export interface LabourStats {
  providers: Provider[];
  directContractors: Provider[];
  total: Provider[];
}
