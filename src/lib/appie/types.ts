export interface Customer {
  id: string;
  email: string;
  full_name: string;
  business_name: string;
  business_type: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  subscription_status: 'provisioning' | 'active' | 'cancelling' | 'grace_period' | 'suspended' | 'terminated';
  plan: 'instant' | 'custom';
  created_at: string;
  updated_at: string;
}

export interface Instance {
  id: string;
  customer_id: string;
  hetzner_server_id: number | null;
  server_ip: string | null;
  server_name: string | null;
  region: string;
  server_type: string;
  status: 'provisioning' | 'installing' | 'configuring' | 'ready' | 'active' | 'paused' | 'terminated';
  provision_step: number;
  provision_started_at: string | null;
  provision_completed_at: string | null;
  last_heartbeat_at: string | null;
  hermes_version: string | null;
  model: string;
  created_at: string;
  updated_at: string;
}

export interface Channel {
  id: string;
  instance_id: string;
  platform: 'telegram' | 'whatsapp' | 'discord' | 'slack' | 'email';
  status: 'pending' | 'connecting' | 'active' | 'error' | 'disconnected';
  bot_token: string | null;
  bot_username: string | null;
  bot_name: string | null;
  external_user_id: string | null;
  connected_at: string | null;
  last_message_at: string | null;
  error_message: string | null;
  config: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ProvisionLog {
  id: string;
  instance_id: string;
  step: number;
  step_name: string;
  status: 'started' | 'completed' | 'failed';
  message: string | null;
  created_at: string;
}

export interface ProvisionStatus {
  status: Instance['status'];
  step: number;
  steps: {
    name: string;
    status: 'done' | 'in_progress' | 'pending' | 'failed';
  }[];
  progress: number;
  estimatedMinutes: number;
}

export const PROVISION_STEPS = [
  'Creating your private server',
  'Installing AI capabilities',
  'Setting up security',
  'Personalizing your Appie',
  'Final checks',
] as const;
