export interface Block {
  data: BlockData;
  evidence: BlockEvidence;
  header: BlockHeader;
  last_commit: BlockLastCommit;
}

export interface BlockData {
  txs: string;
}

export interface BlockEvidence {
  evidence: string;
}

export interface BlockHeader {
  app_hash: string;
  chain_id: string;
  consensus_hash: string;
  data_hash: string;
  evidence_hash: string;
  height: string;
  last_block_id: BlockId;
  last_commit_hash: string;
  last_results_hash: string;
  next_validators_hash: string;
  proposer_address: string;
  time: string;
  validators_hash: string;
  version: BlockVersion;
}

export interface BlockId {
  hash: string;
  parts: BlockIdParts;
}

export interface BlockIdParts {
  hash: string;
  total: string;
}

export interface BlockLastCommit {
  height: string;
  round: string;
  block_id: BlockId;
  signatures: BlockLastCommitSignature[];
}

export interface BlockLastCommitSignature {
  block_id_flag: number;
  validator_address: string;
  timestamp: string;
  signature: string;
}

export interface BlockVersion {
  app: string;
  block: string;
}

export interface LatestBlock {
  block: Block;
  block_id: BlockId;
}
