import { getSupabaseAdmin } from '@/lib/supabase';
import type { Customer, Instance, Channel, ProvisionStatus } from './types';

// ─── ID generation (use crypto in browser, node in server) ─────────────────
function newId(): string {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }
  // Fallback: timestamp + random
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

// ─── Customer Operations ──────────────────────────────────────────────────────

export async function createCustomer(data: {
  email: string;
  full_name: string;
  business_name?: string;
  business_type?: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
}): Promise<Customer> {
  const { data: customer, error } = await getSupabaseAdmin()
    .from('customers')
    .upsert({
      id: newId(),
      email: data.email.toLowerCase().trim(),
      full_name: data.full_name,
      business_name: data.business_name || '',
      business_type: data.business_type || '',
      stripe_customer_id: data.stripe_customer_id || null,
      stripe_subscription_id: data.stripe_subscription_id || null,
      subscription_status: 'provisioning',
    }, { onConflict: 'email' })
    .select()
    .single();

  if (error) throw new Error(`createCustomer: ${error.message}`);
  return customer;
}

export async function getCustomerByEmail(email: string): Promise<Customer | null> {
  const { data } = await getSupabaseAdmin()
    .from('customers')
    .select()
    .eq('email', email.toLowerCase().trim())
    .single();
  return data;
}

export async function getCustomerByStripeCustomerId(stripeCustomerId: string): Promise<Customer | null> {
  const { data } = await getSupabaseAdmin()
    .from('customers')
    .select()
    .eq('stripe_customer_id', stripeCustomerId)
    .single();
  return data;
}

export async function updateCustomerStatus(
  customerId: string,
  status: Customer['subscription_status']
): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from('customers')
    .update({ subscription_status: status })
    .eq('id', customerId);
  if (error) throw new Error(`updateCustomerStatus: ${error.message}`);
}

export async function updateCustomer(
  customerId: string,
  updates: Partial<Pick<Customer, 'full_name' | 'business_name' | 'business_type' | 'subscription_status'>>
): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from('customers')
    .update(updates)
    .eq('id', customerId);
  if (error) throw new Error(`updateCustomer: ${error.message}`);
}

// ─── Instance Operations ──────────────────────────────────────────────────────

export async function createInstance(customerId: string): Promise<Instance> {
  const { data: instance, error } = await getSupabaseAdmin()
    .from('instances')
    .insert({
      id: newId(),
      customer_id: customerId,
      status: 'provisioning',
      provision_step: 0,
    })
    .select()
    .single();

  if (error) throw new Error(`createInstance: ${error.message}`);
  return instance;
}

export async function getInstanceByCustomer(customerId: string): Promise<Instance | null> {
  const { data } = await getSupabaseAdmin()
    .from('instances')
    .select()
    .eq('customer_id', customerId)
    .single();
  return data;
}

export async function getInstanceById(instanceId: string): Promise<Instance | null> {
  const { data } = await getSupabaseAdmin()
    .from('instances')
    .select()
    .eq('id', instanceId)
    .single();
  return data;
}

export async function updateInstance(
  instanceId: string,
  updates: Partial<Pick<Instance, 'status' | 'provision_step' | 'hetzner_server_id' | 'server_ip' | 'server_name' | 'provision_completed_at' | 'hermes_version'>>
): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from('instances')
    .update(updates)
    .eq('id', instanceId);
  if (error) throw new Error(`updateInstance: ${error.message}`);
}

// ─── Provision Logging ────────────────────────────────────────────────────────

export async function logProvisionStep(
  instanceId: string,
  step: number,
  stepName: string,
  status: 'started' | 'completed' | 'failed',
  message?: string
): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from('provision_logs')
    .insert({
      id: newId(),
      instance_id: instanceId,
      step,
      step_name: stepName,
      status,
      message: message || null,
    });
  if (error) console.error('logProvisionStep error:', error.message);
}

const STEP_NAMES = [
  'Creating your private server',
  'Installing AI capabilities',
  'Setting up security',
  'Personalizing your Appie',
  'Final checks',
];

export async function getProvisionStatus(instanceId: string): Promise<ProvisionStatus | null> {
  const { data: instance } = await getSupabaseAdmin()
    .from('instances')
    .select()
    .eq('id', instanceId)
    .single();

  if (!instance) return null;

  const { data: logs } = await getSupabaseAdmin()
    .from('provision_logs')
    .select()
    .eq('instance_id', instanceId)
    .order('created_at', { ascending: true });

  const steps = STEP_NAMES.map((name, i) => {
    const stepNum = i + 1;
    const lastLog = logs
      ?.filter(l => l.step === stepNum)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .pop();

    let s: 'done' | 'in_progress' | 'pending' | 'failed' = 'pending';
    if (lastLog?.status === 'completed') s = 'done';
    else if (lastLog?.status === 'started') s = 'in_progress';
    else if (lastLog?.status === 'failed') s = 'failed';

    return { name, status: s };
  });

  const completedSteps = steps.filter(s => s.status === 'done').length;
  const progress = Math.round((completedSteps / steps.length) * 100);
  const estimatedMinutes = Math.max(1, 5 - completedSteps);

  return {
    status: instance.status as Instance['status'],
    step: instance.provision_step,
    steps,
    progress,
    estimatedMinutes,
  };
}

// ─── Channel Operations ───────────────────────────────────────────────────────

export async function createChannel(
  instanceId: string,
  platform: Channel['platform']
): Promise<Channel> {
  const { data, error } = await getSupabaseAdmin()
    .from('channels')
    .upsert({
      id: newId(),
      instance_id: instanceId,
      platform,
      status: 'pending',
    }, { onConflict: 'instance_id,platform' })
    .select()
    .single();

  if (error) throw new Error(`createChannel: ${error.message}`);
  return data;
}

export async function getChannel(
  instanceId: string,
  platform: Channel['platform']
): Promise<Channel | null> {
  const { data } = await getSupabaseAdmin()
    .from('channels')
    .select()
    .eq('instance_id', instanceId)
    .eq('platform', platform)
    .single();
  return data;
}

export async function updateChannel(
  instanceId: string,
  platform: Channel['platform'],
  updates: Partial<Pick<Channel, 'status' | 'bot_token' | 'bot_username' | 'bot_name' | 'external_user_id' | 'connected_at' | 'error_message'>>
): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from('channels')
    .update(updates)
    .eq('instance_id', instanceId)
    .eq('platform', platform);
  if (error) throw new Error(`updateChannel: ${error.message}`);
}

export async function getChannelsByInstance(instanceId: string): Promise<Channel[]> {
  const { data } = await getSupabaseAdmin()
    .from('channels')
    .select()
    .eq('instance_id', instanceId);
  return data || [];
}

// ─── Tool Connections ─────────────────────────────────────────────────────────

export async function getToolConnections(instanceId: string) {
  const { data } = await getSupabaseAdmin()
    .from('tool_connections')
    .select()
    .eq('instance_id', instanceId);
  return data || [];
}

export async function upsertToolConnection(
  instanceId: string,
  tool: string,
  status: Channel['status']
): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from('tool_connections')
    .upsert({
      id: newId(),
      instance_id: instanceId,
      tool,
      status,
    }, { onConflict: 'instance_id,tool' });
  if (error) console.error('upsertToolConnection error:', error.message);
}

// ─── Stripe Event Idempotency ─────────────────────────────────────────────────

export async function isEventProcessed(eventId: string): Promise<boolean> {
  const { data } = await getSupabaseAdmin()
    .from('stripe_events')
    .select('id')
    .eq('id', eventId)
    .single();
  return !!data;
}

export async function markEventProcessed(eventId: string, eventType: string, payload?: unknown): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from('stripe_events')
    .insert({ id: eventId, event_type: eventType, payload: payload || null });
  if (error) console.error('markEventProcessed error:', error.message);
}

// ─── Checkout Session ─────────────────────────────────────────────────────────

export async function getCheckoutSession(sessionId: string) {
  const { data } = await getSupabaseAdmin()
    .from('checkout_sessions')
    .select()
    .eq('id', sessionId)
    .single();
  return data;
}

export async function upsertCheckoutSession(
  sessionId: string,
  customerId: string,
  product: 'instant_appie' | 'build_your_own' | 'custom',
  amountCents?: number
): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from('checkout_sessions')
    .upsert({
      id: sessionId,
      customer_id: customerId,
      product,
      amount_cents: amountCents || null,
      status: 'completed',
    }, { onConflict: 'id' });
  if (error) throw new Error(`upsertCheckoutSession: ${error.message}`);
}
